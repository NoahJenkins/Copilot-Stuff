# 2026-03-11 — sync-agents Step 2 and Step 5 Corrections

## Summary

Fixed two bugs in `sync-agents` introduced when `AGENTS.md` became the source of truth:
1. `AGENTS.md` was listed as a Codex detection signal in Step 2 — causing false-positive Codex detection in every repo
2. `.agents/skills/` was listed as a Codex skills target in Step 5 — no such convention is documented for Codex

Also confirmed through live testing that Claude Code does read skills from `.claude/skills/<name>/SKILL.md`.

## Issues Found

### Step 2: Codex detection signal was too broad

**Before:**
```
| **OpenAI Codex** | `AGENTS.md` at repo root **or** `.agents/` directory | Full sync |
```

Since `AGENTS.md` is now the source of truth present in virtually every repo, this caused Codex to always be detected — even in repos with no Codex tooling. This would trigger skill syncs to `.agents/skills/` unnecessarily.

**After:**
```
| **OpenAI Codex** | `.agents/` directory | Full sync — AGENTS.md is source of truth; detect only if .agents/ is explicitly present |
```

### Step 5: `.agents/skills/` was a fabricated convention

The Step 5 table previously claimed:
```
| OpenAI Codex / OpenCode | `.agents/skills/<name>/SKILL.md` | ✅ If detected |
```

OpenAI Codex has no documented `.agents/skills/` convention. This path was invented. The skill was creating files that no tool would ever read.

**After:** Codex row removed entirely. OpenCode commands are handled by Step 3D (`.opencode/commands/`), not Step 5.

### `.claude/skills/` confirmed working

Live testing confirmed Claude Code discovers and invokes skills from `.claude/skills/<name>/SKILL.md`. Skills in `.github/skills/` are NOT automatically available to Claude Code — only `.claude/skills/` is read. The Step 5 Claude Code entry is correct and retained.

## Changes Made

| File | Change |
| :--- | :--- |
| `skills/sync-agents/SKILL.md` | Step 2: Codex detection → `.agents/` only. Step 5: removed `.agents/skills/` Codex entry, added OpenCode note pointing to Step 3D |
| `.github/skills/sync-agents/SKILL.md` | Same changes + kept overwrite note for Claude Code |
| `.agents/` (directory) | Deleted — orphaned file created by previous incorrect sync |

## Related

- [ADR 0004](../adr/0004-agents-md-as-sync-source-of-truth.md) — AGENTS.md as sync source of truth (previous session)
