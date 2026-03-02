# Repository Overview

This repository is a collection of GitHub Copilot artifacts (agents, prompts, skills, instructions) that users install into their own repositories or workspaces. It is **not** an application — there is no build system, runtime, or test suite.

## Structure

| Directory | Purpose |
|---|---|
| `agents/` | Agent artifacts for download and install into other repos |
| `prompts/` | Prompt artifacts for download and install into other repos |
| `skills/` | Skill artifacts (each in its own folder with a `SKILL.md`) |
| `instructions/` | Reusable instruction artifacts |
| `docs/` | ADRs, architecture notes, context notes, and indexes |
| `.github/agents/` | Agents used **within this repo** for orchestration |
| `.github/instructions/` | Path-specific instructions applied within this repo |

Root-level `agents/` and `prompts/` files are individual artifacts meant to be copied out — not used here directly.

## Agent Orchestration

Use these specialized agents (in `.github/agents/`) for work within this repo:

- **`@copilot-engineer`** — designing, building, and maintaining Copilot artifacts (agents, prompts, instructions)
- **`@documentation-specialist`** — ADRs, architecture docs, context notes, README updates
- **`@prompt-engineer`** — creating, reviewing, and optimizing prompt files
- **`@research-agent`** — technical research and context gathering to support planning

Delegate to the appropriate agent when a request falls within its domain.

## Archive Policy

- `docs/archive/` stores older artifact versions for historical reference only.
- Treat archived files as inactive; do not use them as primary install targets when active equivalents exist.
- When listing or linking artifacts, prioritize `agents/`, `prompts/`, `skills/`, `instructions/` first.
