# ADR 0005: Enforce concise root AGENTS.md with nested overlays

## Status
Accepted

## Context

`onboard-copilot` generated a large monolithic root `AGENTS.md` template that often included extensive documentation policy details, delegation matrices, and long prose sections. In practice, this inflated always-on instruction context and increased duplication of rules that only apply to specific directories or concerns.

The repository already documents nested `AGENTS.md` precedence and path-scoped behavior across tools. We need onboarding output to align with that model so generated instructions remain concise, portable, and maintainable.

## Options Considered

### Option 1: Keep monolithic root AGENTS.md
**Pros:** Single file to inspect.
**Cons:** Context bloat, duplication, weaker directory-specific guidance, harder maintenance.

### Option 2: Root-only with aggressive trimming, no nested files
**Pros:** Minimal file footprint.
**Cons:** Loses useful scoped guidance and forces over-compression of important details.

### Option 3: Concise root + nested AGENTS.md overlays (Adopted)
**Pros:** Maintains global clarity while preserving scoped detail; supports tool-universal directory cascade behavior; improves long-term maintainability.
**Cons:** Adds more files to manage in larger repositories.

## Decision

Adopt a mandatory generation policy in `onboard-copilot`:

1. Root `AGENTS.md` must stay under 100 lines.
2. Root includes only universal, always-on constraints and short pointers.
3. Verbose or directory-specific guidance must be moved into nested `AGENTS.md` files (for example under `app/`, `components/`, `lib/`, `docs/`, `.github/` where applicable).
4. Onboarding must validate root size and split/regenerate when over limit.

## Consequences

### Positive
- Reduces always-on instruction noise in AI sessions.
- Improves relevance by scoping detailed guidance to the directories where it applies.
- Keeps onboarding output aligned with documented AGENTS cascade behavior.

### Negative
- Slightly more complex onboarding output structure.
- Teams must maintain nested files in addition to root.
