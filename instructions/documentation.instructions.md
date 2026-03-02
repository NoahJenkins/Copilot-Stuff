---
description: Documentation structure, ADR format, and update policy for this repository.
applyTo: 'docs/**, *.md, *.mdx'
---

## Documentation Structure

| Directory | Purpose |
|---|---|
| `docs/architecture/` | High-level design, system diagrams, data flow |
| `docs/adr/` | Architecture Decision Records (immutable, append-only) |
| `docs/context/` | Research notes, planning sessions, exploratory work |
| `docs/TODO.md` | Living task tracker |

## ADR Format
Files named `NNNN-short-title.md`. Each ADR must include: **Status** (proposed / accepted / deprecated / superseded), **Context**, **Options Considered**, **Decision**, **Consequences**. Create a new ADR — never edit an existing one — when a decision is reversed or superseded.

**Write an ADR when decisions affect**: structure, dependencies, interfaces, runtime behavior, or non-functional requirements.

## Context Note Format
Files named `YYYY-MM-DD-topic-name.md` with sections: **Summary** (2–3 sentences), **Options/Findings**, **Open Questions**. Maintain `docs/context/index.md` linking notes to their resulting ADRs.

## Documentation Update Policy
For any non-trivial change, update documentation in the same turn without asking for confirmation:
- Update `docs/TODO.md` and `docs/context/index.md`.
- Create a dated context note in `docs/context/` for research or exploratory work.
- Create or update an ADR when an architecture, dependency, or runtime decision changes.
- Update `docs/architecture/` when system structure or data flow changes.
- A task is incomplete until required documentation updates are applied.
- Use `@documentation-specialist` automatically after implementation for docs updates.
- State explicitly why no docs update is needed when that is the case.
