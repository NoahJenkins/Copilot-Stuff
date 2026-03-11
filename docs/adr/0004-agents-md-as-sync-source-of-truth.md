# ADR 0004: AGENTS.md as the Source of Truth for sync-agents and onboard-copilot

## Status
Accepted

## Context

With the introduction of `AGENTS.md` as the universal standard (ADR 0003), two artifacts in this repository still treated `.github/copilot-instructions.md` as the source of truth:

1. **`sync-agents` skill** — Step 1 read `.github/copilot-instructions.md` and distributed its content to all 12 AI tool ecosystems. Every synced file header pointed back to `.github/copilot-instructions.md`.

2. **`onboard-copilot` prompt** — Section 8 created `.github/copilot-instructions.md` as the project's instruction file when onboarding a new repository.

This creates a context duplication problem: if both `AGENTS.md` and `.github/copilot-instructions.md` exist in a target repo, GitHub Copilot (Aug 2025+) reads **both** files. When `sync-agents` creates `AGENTS.md` as a copy of `copilot-instructions.md`, the result is identical content loaded twice — unnecessary context usage.

Additionally, the `onboard-copilot` prompt was setting up new repos with `.github/copilot-instructions.md` as their instruction file, despite `AGENTS.md` being the better multi-tool choice.

## Decision

Adopt `AGENTS.md` at the repo root as the primary source of truth for both artifacts:

### sync-agents skill

1. **Step 1** now reads `AGENTS.md` first. Falls back to `.github/copilot-instructions.md` for repos that haven't migrated yet. If neither exists, stops with a clear error message.

2. **Step 3C** (previously: sync TO `AGENTS.md`) is now a skip step — `AGENTS.md` is the source, not a target.

3. **Step 3D** (OpenCode) simplified — OpenCode reads `AGENTS.md` natively, no sync needed.

4. All sync template headers updated: "Source of truth: AGENTS.md" instead of `.github/copilot-instructions.md`.

5. **Coverage table** updated: GitHub Copilot, OpenAI Codex, and OpenCode all read `AGENTS.md` natively (no sync needed). All other tools receive synced copies as before.

### onboard-copilot prompt

Section 8 now creates `AGENTS.md` at the repo root instead of `.github/copilot-instructions.md`. A note explains the rationale (universal multi-tool coverage) and points back to `docs/README.ai-tools-guide.md` for users who prefer a Copilot-only setup.

## Options Considered

### Option 1: Keep copilot-instructions.md as source (no change)
**Pros:** No migration needed.
**Cons:** Context duplication in repos where both files coexist. New repos onboarded with copilot-instructions.md miss out on multi-tool coverage from day one.

### Option 2: AGENTS.md as primary source, fallback to copilot-instructions.md (Adopted)
**Pros:**
- Eliminates context duplication in repos that use both files
- New repos get multi-tool coverage from day one
- Backwards compatible — existing repos with only copilot-instructions.md continue to work
- Matches the direction the ecosystem is heading (AGENTS.md universal status)

**Cons:**
- Repos with only copilot-instructions.md use the fallback path — slightly more complex Step 1 logic

### Option 3: Deprecate copilot-instructions.md entirely
**Pros:** Simplest long-term state.
**Cons:** Breaking change for existing users; premature while some workflows still depend on the file.

## Consequences

### Positive
- No context duplication when both files coexist in a target repo
- New repos onboarded via `onboard-copilot` use the universal AGENTS.md format
- GitHub Copilot, OpenAI Codex, OpenCode, Cursor, Gemini CLI, and VS Code all benefit from AGENTS.md automatically — fewer tools need separate synced copies
- Backwards compatible: repos with only copilot-instructions.md continue to work via fallback

### Negative
- `.github/copilot-instructions.md` is no longer created by `onboard-copilot` — users who specifically need the Copilot-native format must create it manually (guide links provided)
- sync-agents users must ensure `AGENTS.md` exists before running the skill; the fallback handles the transition gracefully

### Migration path for existing repos
1. Rename (or copy content from) `.github/copilot-instructions.md` → `AGENTS.md` at the repo root
2. Run `/sync-agents` — it will now distribute from `AGENTS.md`
3. Optionally delete `.github/copilot-instructions.md` to eliminate duplication (Copilot will use `AGENTS.md` as its primary source)
