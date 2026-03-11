# 2026-03-11 — AI Tools Guide and AGENTS.md Universal Standard

## Summary

Researched and documented the current state of AI coding tool instruction files, with a focus on `AGENTS.md`'s emergence as a universal standard. Implemented a new guide, root-level instruction files, and updates to the sync-agents skill.

## Key Research Findings

### AGENTS.md Is Now Universal

As of August 28, 2025, GitHub Copilot's coding agent added `AGENTS.md` support (GitHub changelog). The file is now recognized by:

- GitHub Copilot (coding agent mode, Aug 2025+)
- OpenAI Codex (original adopter)
- OpenCode
- Google Gemini CLI (partial)
- Cursor
- VS Code (via Copilot integration)

When both `AGENTS.md` (root) and `.github/copilot-instructions.md` exist, Copilot reads both. `AGENTS.md` takes higher precedence. Nested `AGENTS.md` files in subdirectories override the parent file — a cascade model Codex introduced and Copilot adopted.

### Copilot-Instructions.md Is NOT Deprecated

`.github/copilot-instructions.md` continues to be supported and is not deprecated. GitHub recommends:
- **Existing repos:** Keep copilot-instructions.md as-is; nothing breaks.
- **New multi-tool repos:** Consider AGENTS.md as the primary file.
- **Both:** Copilot reads both; AGENTS.md takes precedence.

### Symlinks: Valid but Nuanced

Symlinks are a valid single-source-of-truth strategy on macOS/Linux, but have portability concerns:
- Windows git requires Developer Mode or admin privileges (`core.symlinks=true`)
- GitHub.com renders symlinks as a link to the target, not inline content
- CI/CD environments vary in symlink support

Decision: this repo uses standalone real files for AGENTS.md and CLAUDE.md because `.github/copilot-instructions.md` is scoped to code reviews only — wrong content for a general contributor file.

### Artifact Type Mental Model

Research consolidated a clear mental model across all tools:

| Type | When Applied | Enforcement |
| :--- | :--- | :--- |
| Instruction files (AGENTS.md, CLAUDE.md, etc.) | Automatic — every session | Probabilistic (AI judgment) |
| Path-scoped instructions | Automatic — on file path match | Probabilistic |
| Prompts / slash commands | Manual — user invokes | N/A (user-triggered) |
| Custom Agents / Subagents | Automatic — delegated by AI | Isolated context |
| Skills | Manual — user invokes `/command` | Portable playbook |
| Hooks (Claude Code only) | Automatic — at lifecycle events | Deterministic (100%) |

### sync-agents Skill: Keep 12-Ecosystem Approach

Evaluated whether sync-agents could be simplified using AGENTS.md + symlinks. Decision: keep the current detection-first, file-copy approach because:
1. sync-agents runs in unknown target repos — symlinks are not portable across environments
2. The 12-ecosystem coverage remains correct; AGENTS.md doesn't yet cover all of them
3. The additive update (noting AGENTS.md's expanded tool support) is the right scope

## Changes Made

| File | Action |
| :--- | :--- |
| `docs/README.ai-tools-guide.md` | Created — comprehensive guide with artifact types, decision tree, multi-tool strategies |
| `AGENTS.md` | Created — contributor context for universal AI tools |
| `CLAUDE.md` | Created — same content as AGENTS.md for Claude Code |
| `docs/adr/0003-adopt-agents-md-as-universal-standard.md` | Created — documents the dual-file decision |
| `skills/sync-agents/SKILL.md` | Updated — AGENTS.md universal status, fallback behavior, section headings |
| `.github/skills/sync-agents/SKILL.md` | Updated — mirror of skill changes |
| `ReadMe.md` | Updated — AI Tools Guide in Contents table, contributor callout |
| `docs/README.skills.md` | Updated — sync-agents description reflects AGENTS.md universal scope |
| `docs/TODO.md` | Updated — new task entries |
| `docs/context/index.md` | Updated — this context note indexed |

## References

- [GitHub Changelog: Copilot coding agent supports AGENTS.md (Aug 28, 2025)](https://github.blog/changelog/2025-08-28-copilot-coding-agent-now-supports-agents-md-custom-instructions/)
- [How to write a great AGENTS.md (GitHub Blog)](https://github.blog/ai-and-ml/github-copilot/how-to-write-a-great-agents-md-lessons-from-over-2500-repositories/)
- [Adding repository custom instructions for GitHub Copilot (GitHub Docs)](https://docs.github.com/copilot/customizing-copilot/adding-custom-instructions-for-github-copilot)
- [OpenAI Codex AGENTS.md guide](https://developers.openai.com/codex/guides/agents-md/)
- Related ADR: [ADR 0003](../adr/0003-adopt-agents-md-as-universal-standard.md)
