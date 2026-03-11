# 2026-03-11 — AGENTS.md as Source of Truth for sync-agents and onboard-copilot

## Summary

Updated `sync-agents` and `onboard-copilot` to treat `AGENTS.md` as the primary source of truth, replacing `.github/copilot-instructions.md` in that role. This eliminates context duplication in target repos and aligns new repo onboarding with the universal AGENTS.md standard.

## Motivation

The previous session created `AGENTS.md` as a universal instruction file (ADR 0003). However, two artifacts still used `.github/copilot-instructions.md` as their source:

- `sync-agents`: distributed copilot-instructions.md content to 12 ecosystems, including writing it to `AGENTS.md` as a copy
- `onboard-copilot`: created `.github/copilot-instructions.md` when onboarding new repos

**The duplication problem:** GitHub Copilot (Aug 2025+) reads BOTH files when both exist. Running `sync-agents` would create an `AGENTS.md` that's a copy of `copilot-instructions.md`, causing Copilot to load identical instructions twice. The user explicitly chose Option 2: make AGENTS.md the source to eliminate this duplication.

## Changes Made

### sync-agents skill (both copies: `skills/sync-agents/SKILL.md` and `.github/skills/sync-agents/SKILL.md`)

| What changed | Before | After |
| :--- | :--- | :--- |
| Frontmatter description | References copilot-instructions.md | References AGENTS.md as source of truth |
| Source file list | copilot-instructions.md listed first | AGENTS.md listed as primary, copilot-instructions.md as fallback |
| Step 1: source reading | Read `.github/copilot-instructions.md`, stop if missing | Read `AGENTS.md` first; fallback to copilot-instructions.md; error if neither |
| "Never delete" instruction | copilot-instructions.md | AGENTS.md |
| Step 3C (AGENTS.md section) | Sync TO AGENTS.md (copy from source) | Skip — AGENTS.md IS the source |
| Step 3D (OpenCode) | "Write AGENTS.md if OpenCode detected but Codex not" | "OpenCode reads AGENTS.md natively — no sync needed" |
| All sync template headers | Source of truth: .github/copilot-instructions.md | Source of truth: AGENTS.md |
| `[INSERT FULL CONTENT OF ...]` placeholder | .github/copilot-instructions.md | AGENTS.md |
| Gemini CLI @import | `@.github/copilot-instructions.md` | `@AGENTS.md` |
| Step 6 source reference | `.github/` (copilot-instructions.md, ...) | `AGENTS.md` |
| Step 6 AGENTS.md note | Conditional: "if AGENTS.md was written" | Always shown: "AGENTS.md is the source of truth" |
| Coverage table | GitHub Copilot → source of truth for copilot-instructions.md | GitHub Copilot, OpenAI Codex, OpenCode → read AGENTS.md natively |

### onboard-copilot prompt (`prompts/onboard-copilot.prompt.md`)

| Location | Before | After |
| :--- | :--- | :--- |
| Section 8 heading | "Create or update `.github/copilot-instructions.md`" | "Create or update `AGENTS.md` at the repo root" |
| Section 8 note | (greenfield only) | Added "Why AGENTS.md?" explanation with multi-tool rationale |
| Completion checklist | `.github/copilot-instructions.md` | `AGENTS.md` with multi-tool description |
| Success message | "Custom instructions configured in ..." | "Universal AI instructions configured in ..." |
| Validation checklist | Validate coding standards in copilot-instructions.md | Validate coding standards in AGENTS.md |
| Developer reference | "Reference copilot-instructions.md for conventions" | "Reference AGENTS.md for conventions" |

### Documentation created

| File | Action |
| :--- | :--- |
| `docs/adr/0004-agents-md-as-sync-source-of-truth.md` | Created — decision record |
| This file | Created — context note |

## Backwards Compatibility

- Repos with only `.github/copilot-instructions.md` (no AGENTS.md): Step 1 fallback continues to work — skill reads copilot-instructions.md as before
- The skill never deletes `.github/copilot-instructions.md` — existing repos are unaffected until the owner migrates
- `.github/copilot-instructions.md` in THIS repo stays unchanged (it's scoped to code reviews — different purpose)

## Related

- [ADR 0003](../adr/0003-adopt-agents-md-as-universal-standard.md) — previous session: AGENTS.md as universal standard
- [ADR 0004](../adr/0004-agents-md-as-sync-source-of-truth.md) — this decision
