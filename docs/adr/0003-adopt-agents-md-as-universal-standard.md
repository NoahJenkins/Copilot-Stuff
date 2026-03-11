# ADR 0003: Adopt AGENTS.md as the Universal Instruction Standard

## Status
Accepted

## Context

As of August 28, 2025, GitHub Copilot's coding agent added support for `AGENTS.md` alongside its existing `.github/copilot-instructions.md` format. `AGENTS.md` is now recognized by GitHub Copilot, OpenAI Codex, OpenCode, Google Gemini CLI, Cursor, and VS Code — making it the closest thing to a universal instruction file standard in the AI coding tool ecosystem.

This creates a decision point: how should this repository's artifacts and documentation reflect the current multi-tool landscape? Specifically:

1. Should the sync-agents skill treat `AGENTS.md` as merely an "OpenAI Codex" target, or as a universal target that benefits multiple tools?
2. Should this repository include root-level `AGENTS.md` and `CLAUDE.md` files for contributors working in the repo itself?
3. Should those files be symlinks to `.github/copilot-instructions.md`, or standalone files?
4. Should the project document when to use each artifact type for users still learning the ecosystem?

## Options Considered

### Option A: No changes — keep copilot-instructions.md as sole documented standard
**Pros:**
- No changes required
- Copilot's native format continues to work

**Cons:**
- The sync-agents skill incorrectly labels AGENTS.md as "OpenAI Codex only"
- Contributors using Claude Code or Gemini CLI have no context file when working in this repo
- The ecosystem has evolved; documentation no longer reflects current reality

### Option B: Migrate to AGENTS.md as the primary source of truth (replace copilot-instructions.md)
**Pros:**
- Single file serves the most tools

**Cons:**
- `.github/copilot-instructions.md` in this repo is explicitly scoped to code review rules, not general contributor context — migration would conflate two distinct purposes
- Breaking change for existing users of the sync-agents skill

### Option C: Dual files — keep copilot-instructions.md, add AGENTS.md and CLAUDE.md at root (Adopted)
**Pros:**
- `.github/copilot-instructions.md` stays scoped to code reviews (correct existing behavior)
- Root `AGENTS.md` and `CLAUDE.md` provide contributor context for non-Copilot tools
- sync-agents skill updated to reflect AGENTS.md's expanded tool support without breaking existing behavior
- New guide (docs/README.ai-tools-guide.md) educates users on the current multi-tool landscape

**Cons:**
- Three files to maintain (copilot-instructions.md, AGENTS.md, CLAUDE.md) — mitigated by the low change frequency of these files

### Option D: Symlinks — AGENTS.md and CLAUDE.md as symlinks to copilot-instructions.md
**Pros:**
- Single source of truth, zero duplication

**Cons:**
- `.github/copilot-instructions.md` says "only to be applied when performing a code review" on line 1 — wrong content scope for general contributor files
- Windows git requires Developer Mode or admin privileges for symlinks (`core.symlinks`)
- GitHub.com renders symlinks as a link to the target file, not inline content — poor experience for repo visitors
- CI/CD environments vary in symlink support

## Decision

Adopt **Option C** (dual files, additive approach):

1. **Keep** `.github/copilot-instructions.md` unchanged — it remains the source of truth for Copilot code review behavior in this repo, and the source for the sync-agents skill when propagating to other repos.

2. **Create** `AGENTS.md` at the repo root with contributor context (repo structure, workflow rules, documentation policy). This file is appropriate for any AI tool a contributor runs while working in this repo.

3. **Create** `CLAUDE.md` at the repo root with the same content as `AGENTS.md`. Claude Code reads `CLAUDE.md`; keeping both files consistent ensures parity.

4. **Update** `skills/sync-agents/SKILL.md` to reflect that `AGENTS.md` is now a universal standard read by multiple tools — not just OpenAI Codex — and to offer `AGENTS.md` creation as a fallback when no agents are detected.

5. **Create** `docs/README.ai-tools-guide.md` to document when to use each artifact type across the full AI coding tool ecosystem.

## Consequences

### Positive
- Contributors using Claude Code, Gemini CLI, or any AGENTS.md-compatible tool have appropriate context when working in this repo
- The sync-agents skill accurately reflects the current ecosystem (AGENTS.md universal status)
- New and existing users of this repo have a clear reference for artifact selection decisions
- No breaking changes to existing Copilot workflows

### Negative
- Three instruction files to maintain (copilot-instructions.md, AGENTS.md, CLAUDE.md)
- Mitigated by: (a) these files change infrequently, (b) copilot-instructions.md serves a different scope than the other two, so they're not truly duplicates

### Future consideration
If `.github/copilot-instructions.md` is ever restructured to separate "code review rules" from "general contributor context," a symlink from `AGENTS.md` and `CLAUDE.md` to the general-context section would eliminate duplication entirely.
