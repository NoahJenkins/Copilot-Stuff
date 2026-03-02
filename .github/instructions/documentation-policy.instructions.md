---
description: Documentation update policy and artifact catalog checklist for this repository.
applyTo: '**'
---

## Documentation Update Policy

For any non-trivial change, update documentation **in the same turn** without asking for confirmation.

- Perform a docs impact check after every edit.
- If impacted, automatically update relevant files under `docs/`:
  - `docs/TODO.md`
  - `docs/context/index.md`
  - A new dated context note in `docs/context/` (format: `YYYY-MM-DD-<topic>.md`)
  - A new ADR in `docs/adr/` when an architecture, behavior, dependency, or runtime decision changed
  - `docs/architecture/` when execution flow or system design changed
- Do **not** ask "do you want me to update docs?" when the need is clear.
- Only ask if the required documentation target is ambiguous.
- If no docs changes are needed, state why in the final response.
- A task is incomplete until required documentation updates are applied.
- Use `@documentation-specialist` automatically after implementation for docs updates.

## Artifact Catalog Checklist

After adding or renaming artifact files:

- [ ] New prompt artifacts are listed in `docs/README.prompts.md`.
- [ ] New agent artifacts are listed in `docs/README.agents.md`.
- [ ] If a new top-level artifact category is added, `ReadMe.md` is updated.

## Install Link Checklist

When adding or updating install buttons in any README or catalog file:

- [ ] Install links use canonical raw GitHub URLs (no cache-busting query parameters like `?v=`).
- [ ] Install links match the artifact type (`chat-prompt`, `chat-agent`, `chat-instructions`).
- [ ] Both VS Code and VS Code Insiders install buttons are present for each artifact.
- [ ] Raw artifact URLs referenced by install links are reachable and return content.
