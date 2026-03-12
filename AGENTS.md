# AI Agent Instructions — Copilot-Stuff
> This file provides context for AI coding tools working **IN** this repository (contributors, maintainers, AI assistants).
> If you are looking to install artifacts from this repo into your own project, see [ReadMe.md](./ReadMe.md).

---

## Repository Purpose

This is a **distribution repository** for reusable GitHub Copilot artifacts. The files here are meant to be installed into other repositories, not used directly in this one.

- `agents/` — distributable agent files (install into your `.github/agents/`)
- `prompts/` — distributable prompts (install into your `.github/prompts/`)
- `skills/` — distributable skills (install into your `.github/skills/`)
- `docs/` — architecture docs, ADRs, context notes, and catalogs
- `.github/` — this repo's own Copilot configuration (code review instructions, internal agents, skills)

---

## Specialized Agents Available

When working in this repo with an agent-mode tool, delegate to these specialists in `.github/agents/`:

- **`@copilot-engineer`** — designing and maintaining Copilot artifacts (agents, prompts, instructions)
- **`@documentation-specialist`** — creating/updating ADRs, architecture docs, context notes, READMEs
- **`@prompt-engineer`** — creating and reviewing Copilot prompts using first-party best practices
- **`@research-agent`** — technical research, gathering context, analyzing information
- **`@skill-engineer`** — creating and maintaining Copilot skills

---

## Documentation Update Policy

For any non-trivial change, update documentation in the same turn without asking for confirmation:

- `docs/TODO.md` — update task tracker
- `docs/context/index.md` — add a new dated context note entry
- `docs/context/` — create a dated context note describing the change
- `docs/adr/` — create an ADR when an architectural or behavioral decision changed
- `docs/architecture/` — update when execution flow or system design changed

A task is **incomplete** until required docs updates are applied.

---

## Artifact Format Rules

### Agents (`agents/` and `.github/agents/`)
- Must have markdown frontmatter with `name`, `description`, and `model` fields
- Follow the structure standard in `instructions/AGENTS.md`
- Filename: lowercase, hyphen-separated, ending in `.agent.md`

### Prompts (`prompts/` and `.github/prompts/`)
- Must have markdown frontmatter with `description` field
- `model` field is strongly recommended
- Filename: lowercase, hyphen-separated, ending in `.prompt.md`

### Skills (`skills/` and `.github/skills/`)
- Each skill lives in its own folder: `<skill-name>/SKILL.md`
- `SKILL.md` must have `name` and `description` frontmatter
- `name` value must match the folder name exactly
- Folder and `name` value: lowercase, hyphen-separated

### Instructions (`.github/instructions/`)
- Must have frontmatter with `description` and `applyTo` fields
- Filename: lowercase, hyphen-separated, ending in `.instructions.md`

---

## Archive Policy

- `docs/archive/` stores older artifact versions for historical reference only
- Do not use archived files as primary install targets when active equivalents exist
- When updating catalogs, prioritize active artifacts; mention archive entries only as reference

---

## Install Button Checks

When adding or modifying artifacts with install buttons:
- Install links must use canonical raw GitHub URLs (no `?v=` cache-busting parameters)
- Install links must match the artifact type (`chat-prompt`, `chat-agent`, `chat-instructions`)
- Both VS Code and VS Code Insiders install buttons must be present for each artifact
- Verify raw artifact URLs are reachable before publishing

---

## Testing Sandbox

- Use `testing_sandbox/` as the local test bed and run the workflow in `.github/skills/test-artifact/SKILL.md` (includes `.instructions.md` validation).
- Write dated feedback reports to `docs/testingResults/YYYY-MM-DD-<artifact-name>.md`; optional cleanup: `git checkout testing_sandbox/`.

## Key Docs

- [docs/README.ai-tools-guide.md](./docs/README.ai-tools-guide.md) — when to use each AI artifact type
- [docs/README.agents.md](./docs/README.agents.md) — agent catalog with install links
- [docs/README.skills.md](./docs/README.skills.md) — skill catalog with install commands
- [docs/README.prompts.md](./docs/README.prompts.md) — prompt catalog with install links
- [docs/TODO.md](./docs/TODO.md) — project task tracker
- [docs/adr/](./docs/adr/) — architecture decision records
- [docs/context/](./docs/context/) — dated research and planning notes
