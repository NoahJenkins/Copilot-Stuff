#!/usr/bin/env bash
set -euo pipefail
# Dev wrapper: always run from project root
cd "$(dirname "$0")"
pnpm run dev
