# ADR 0006: Use test-artifact skill plus sandbox AGENTS overlay for artifact testing

## Status
Accepted

## Context

The repository now includes `testing_sandbox/` to validate distributable artifacts
(agents, prompts, instructions, and skills) against a realistic codebase. We needed
to decide where this testing workflow should live so agents can consistently:

- Use the sandbox for artifact validation
- Include `.instructions.md` testing
- Publish feedback in root docs
- Optionally reset sandbox changes

Root `AGENTS.md` must remain concise per ADR 0005 and should avoid absorbing long,
procedural workflows.

## Options Considered

### Option 1: Put full workflow in root AGENTS.md/CLAUDE.md
**Pros:** Always visible in global instructions.
**Cons:** Increases always-on context and risks violating concise-root policy.

### Option 2: Use only a nested `testing_sandbox/AGENTS.md`
**Pros:** Correctly path-scoped guidance.
**Cons:** Workflow is less discoverable from repo root and lacks reusable skill semantics.

### Option 3: Skill + short root pointer + nested overlay (Adopted)
**Pros:**
- Keeps root instructions concise
- Provides reusable, explicit workflow for on-demand testing
- Preserves path-scoped context in the sandbox directory
- Aligns with ADR 0005 (concise root + nested overlays)

**Cons:**
- Adds one more artifact to maintain

## Decision

Adopt a combined pattern:

1. Create `.github/skills/test-artifact/SKILL.md` as the canonical testing workflow.
2. Add brief root pointers in `AGENTS.md` and `CLAUDE.md` to direct agents to the skill.
3. Add `testing_sandbox/AGENTS.md` as a directory-scoped overlay.
4. Write test feedback reports to `docs/testingResults/YYYY-MM-DD-<artifact-name>.md`.
5. Include optional cleanup guidance: `git checkout testing_sandbox/`.

## Consequences

### Positive
- Testing behavior is standardized and repeatable.
- Root instructions remain concise while preserving discoverability.
- `.instructions.md` validation is explicitly covered.
- Feedback artifacts are centralized under root docs.

### Negative
- Requires keeping skill, root pointers, and nested overlay aligned.