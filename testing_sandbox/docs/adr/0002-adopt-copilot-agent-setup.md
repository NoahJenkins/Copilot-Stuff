# ADR 0002: Adopt GitHub Copilot Agent Setup and Dual AGENTS.md Convention

## Status
Accepted

## Context
Following the initial documentation framework (ADR 0001), the project needed a consistent,
machine-readable way to communicate project conventions to GitHub Copilot and any compatible
AI coding agents. Three pain points drove this decision:

1. **Copilot context drift** — without explicit instruction files, Copilot suggestions drifted
   from project conventions (e.g., using `npm` instead of `pnpm`, ignoring the App Router pattern).
2. **Agent specialization** — a single catch-all instruction file could not adequately scope
   guidance for specialized tasks (security audits, frontend review, documentation authoring).
3. **Onboarding friction** — new contributors and AI agents alike had no single authoritative
   source describing the project's tech stack, coding standards, and sub-agent delegation model.

## Options Considered

### Option 1: Single `.github/copilot-instructions.md` file
**Pros:**
- Simple; one file to maintain.
- Natively supported by GitHub Copilot.

**Cons:**
- No specialization per task type.
- Grows unwieldy as the project matures.
- No clear separation between general guidance and sub-agent roles.

### Option 2: Canonical agent files only (`.github/agents/*.agent.md`)
**Pros:**
- Cleanly scoped per specialist role.
- Canonical definitions can be version-controlled and sourced from a shared origin.

**Cons:**
- No root-level entry point for Copilot's default context injection.
- Requires every contributor to know which agent file to reference.

### Option 3: Dual AGENTS.md convention + canonical agent files (chosen)
**Pros:**
- Root `AGENTS.md` provides the default project-level context for Copilot and any AI agent.
- `docs/AGENTS.md` scopes documentation-specific process rules close to the docs they govern.
- Specialist agent files (`.github/agents/*.agent.md`) provide deep, role-specific guidance.
- Clear delegation model: root → docs → specialist agents.
- Minimal duplication — each layer adds scope, not repetition.

**Cons:**
- Two AGENTS.md files to keep synchronized at a high level.
- Contributors must understand the three-layer hierarchy.

## Decision
Adopt the **dual AGENTS.md + canonical specialist agents** convention:

| Artifact | Location | Purpose |
|---|---|---|
| Root instruction file | `AGENTS.md` | Default project context: stack, standards, delegation map |
| Docs process file | `docs/AGENTS.md` | ADR, context note, architecture doc, and TODO rules |
| Specialist agents | `.github/agents/*.agent.md` | Deep, role-scoped guidance for Copilot agent mode |

Specialist agents installed and verified as of 2026-03-20:
- `code-reviewer.agent.md`
- `documentation-specialist.agent.md`
- `research-agent.agent.md`
- `security-specialist.agent.md`
- `frontend-specialist.agent.md`

Sub-agent delegation is declared in root `AGENTS.md` under **Sub-Agent Delegation** and
mirrors the agent files above. Documentation process rules live exclusively in `docs/AGENTS.md`
to avoid duplication with root `AGENTS.md`.

## Consequences

### Positive
- Copilot and compatible AI agents receive accurate, up-to-date project context by default.
- Specialist tasks (security audit, documentation refresh, code review) are delegated to the
  correct agent with the correct scope.
- The `docs/AGENTS.md` co-location means documentation rules evolve with the docs directory.
- Onboarding a new contributor or re-running an AI onboarding pass is repeatable and
  self-documenting via the AGENTS.md hierarchy.

### Negative
- Three artifact layers require discipline to keep consistent when conventions change.
- The `.github/agents/` directory is a convention, not a GitHub-native feature; tooling support
  may vary across Copilot versions.

### Mitigation Strategies
- On any significant convention change, update root `AGENTS.md` first, then propagate to
  `docs/AGENTS.md` and the relevant specialist agent file.
- Include AGENTS.md review in the PR checklist (`.github/PULL_REQUEST_TEMPLATE.md`).
- Re-run onboarding refresh (context note + TODO update) whenever a new agent is added or
  an existing agent definition is substantially changed.

## Related
- Supersedes: nothing (first agent-setup decision for this repo)
- Context note: [2026-03-20-onboarding-report](../context/2026-03-20-onboarding-report.md)
- Prior ADR: [ADR 0001 — Adopt Structured Documentation Framework](./0001-adopt-documentation-structure.md)
