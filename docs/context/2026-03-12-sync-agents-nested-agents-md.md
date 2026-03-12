# sync-agents: Nested AGENTS.md Support

**Date:** 2026-03-12

## Change

Updated the `sync-agents` skill to treat nested `AGENTS.md` files (outside the root and `.github/`) as directory-scoped sources of truth, syncing them to matching per-directory tool config files.

## What changed

- **Step 1** — Now scans for nested `AGENTS.md` files (any `AGENTS.md` outside the repo root and `.github/`) and records their directory path and content as additional inputs.
- **Step 3A (Claude Code)** — For each nested `AGENTS.md`, creates a matching `<dir>/CLAUDE.md` with the standard sync header. Mirrors the root-level `AGENTS.md → CLAUDE.md` sync pattern.
- **Step 3B (Gemini CLI)** — For each nested `AGENTS.md`, creates a matching `<dir>/GEMINI.md` using Gemini's `@AGENTS.md` import syntax.
- **Step 3C (AGENTS.md/Codex)** — Added guard: do not overwrite nested `AGENTS.md` files that were found in Step 1 as hand-authored sources.
- **Step 6 reporting** — Added `📂 Nested AGENTS.md found` line and a "Nested directory syncs" section to the output report.
- **Coverage reference table** — Added rows for `<dir>/CLAUDE.md`, `<dir>/GEMINI.md`, and `<dir>/AGENTS.md`.

## Motivation

Nested `AGENTS.md` files were previously treated only as outputs (created for Codex directory-level merging from `.github/instructions/`). The design now also treats them as inputs — hand-authored directory-scoped instruction files that should be distributed to all active tools that support nested config files (Claude Code, Gemini CLI). This mirrors how Claude Code natively reads `CLAUDE.md` at each directory level.

## Files updated

- `.github/skills/sync-agents/SKILL.md` — source of truth
- `.claude/skills/sync-agents/SKILL.md` — synced copy
