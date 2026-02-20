# Agent Enhancements — 2026-02-20

## Summary

All six root agent artifacts in `agents/` were restructured with a consistent schema (Role, Scope, Inputs, Process, Output Contract, Handoffs, Limits) to improve clarity, reduce inter-agent overlap, and make every agent language/framework-agnostic. Path-casing errors in repository configuration files were corrected and the agent catalog in `docs/README.agents.md` was completed.

## Findings

### Structural standardization

All agents now follow a shared skeleton:

| Section | Purpose |
|---|---|
| **Role** | Single-sentence mission, defines what the agent does and its hard boundary |
| **Scope** | Explicit in-scope and out-of-scope with named delegation targets |
| **Inputs** | What context the agent requires before starting work |
| **Process** | Ordered execution steps |
| **Output Contract** | Exact output shape (table, sections, schema) so outputs are verifiable |
| **Handoffs** | Named conditions that trigger delegation to another agent |
| **Limits** | Hard constraints that must never be violated |

### Inter-agent handoff contracts

| From | Condition | To |
|---|---|---|
| `code-reviewer` | Security vulnerability found | `security-specialist` |
| `code-reviewer` | Docs files need updating | `documentation-specialist` |
| `security-specialist` | Architectural remediation needed | `documentation-specialist` |
| `security-specialist` | Surface-level code quality only | `code-reviewer` |
| `research-agent` | Structured findings ready | `documentation-specialist` |
| `prompt-engineer` | Agent/instruction artifact needed | `copilot-engineer` |
| `prompt-engineer` | Factual research needed | `research-agent` |
| `copilot-engineer` | Prompt-quality-only optimization | `prompt-engineer` |
| `copilot-engineer` | Research needed for artifact content | `research-agent` |
| `copilot-engineer` | ADR or context note needed | `documentation-specialist` |

### Context-note ownership clarification

`documentation-specialist` is now the declared default owner for creating and indexing context notes. `research-agent` produces structured findings and suggests filenames but does not directly write to `docs/context/`.

### Tool-agnostic research process

`research-agent` previously hard-referenced "context7" as the mandatory first tool. This was replaced with portable guidance: use the best available documentation retrieval tool in the current environment; fall back to web search targeting official first-party domains. This preserves the intent without breaking portability across editor environments.

### Path/casing corrections

`.github/copilot-instructions.md` contained `Agents/`, `Instructions/`, `Agents/README.md`, and `Instructions/README.md` — none of which match the actual repository structure. These were corrected to `agents/`, `docs/README.agents.md`, and the non-existent `Instructions/` reference was removed.

`ReadMe.md` had a broken skill path reference (`sync-agentsv2`) corrected to `sync-agents`.

### Docs catalog completion

`docs/README.agents.md` previously listed only `prompt-engineer` and `copilot-engineer`. All four remaining agents (`code-reviewer`, `security-specialist`, `research-agent`, `documentation-specialist`) were added with VS Code, VS Code Insiders, and raw URL install entries.

### Model field policy

`model` is declared only on specialized long-form agents (`prompt-engineer`, `copilot-engineer`) where model-specific optimization is meaningful. Lightweight specialist agents remain model-flexible for portability.

## Open Questions

- Should `onboarding-core` tags be added to `prompt-engineer` and `copilot-engineer` now that they are fully structured? Currently only the four operational specialists carry `onboarding-core`.
- Should a `.github/agents/` sync run be triggered to mirror the updated artifacts to curated subset targets?

## Related Links

- [ADR 0001 — Adopt Documentation Structure](../adr/0001-adopt-documentation-structure.md)
- [docs/README.agents.md](../README.agents.md)
- [Context Notes Index](./index.md)
