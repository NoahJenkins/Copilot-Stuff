# 2026-03-11 — Concise Root AGENTS.md and Nested Overlay Refactor

## Summary

Refactored `prompts/onboard-copilot.prompt.md` to prevent oversized root instruction files. The prompt now enforces a root `AGENTS.md` target under 100 lines and instructs generation of nested `AGENTS.md` files for scoped or verbose guidance.

## Motivation

Recent onboarding output produced a very large root `AGENTS.md` with mixed global and scoped content. This reduced instruction quality by front-loading too much always-on text and duplicating details that are better attached to specific directories.

The user explicitly requested a tool-universal split strategy based on nested `AGENTS.md` files.

## Changes Made

### Prompt changes (`prompts/onboard-copilot.prompt.md`)

- Added a mandatory root-size policy: keep root `AGENTS.md` under 100 lines.
- Added a mandatory decomposition policy for nested `AGENTS.md` files.
- Added a split rubric (what belongs at root vs nested files).
- Replaced long template sections with concise root policy pointers and nested skeleton examples.
- Added execution-step validation to split/regenerate when root exceeds 100 lines.

### Documentation changes

- Updated `docs/README.ai-tools-guide.md` to recommend stricter generated root size and nested overlays for large repos.
- Updated `docs/README.prompts.md` to document the concise-root output behavior.
- Updated `docs/TODO.md` with completed onboarding prompt refactor task.
- Added ADR 0005 to record this instruction architecture decision.

## Related

- [ADR 0005](../adr/0005-enforce-concise-root-agents-with-nested-overlays.md)
