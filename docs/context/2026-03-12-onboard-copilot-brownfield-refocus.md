---
date: 2026-03-12
topic: onboard-copilot prompt refocus — brownfield-first, coding standards, orchestration, researchReports
---

# Context Note: OnboardCopilot Brownfield Refocus

## Summary

Refocused the `onboard-copilot` prompt to prioritize GitHub Copilot setup over generic repo scaffolding. The prompt is now brownfield-first, with coding standards extraction as a primary concern, explicit agent orchestration patterns, `docs/researchReports/` as a fourth docs type, and a mandatory `/sync-agents` conclusion step.

## Findings

### Problems with previous version
- Greenfield and brownfield modes had roughly equal weight, obscuring the primary use case
- Coding standards were embedded inside the AGENTS.md template section rather than treated as a dedicated extraction step
- No `/sync-agents` step — users would complete onboarding without propagating to Claude Code, Cursor, etc.
- `docs/researchReports/` was absent; only `docs/context/` existed for research
- Optional items (env config, IDE config, pre-commit hooks, GitHub templates) were weighted equally with core Copilot setup
- Orchestration was documented only as a delegation table, not as a named step with handoff protocol
- Initial ADR was about generic docs structure adoption, not about Copilot agent setup specifically

### Changes made

**Reordered priorities:**
1. Section 1: Codebase analysis with explicit brownfield coding standards extraction
2. Section 2: Coding standards + AGENTS.md (coding standards now drive the template)
3. Section 3: Custom agents installation (unchanged logic, same install script)
4. Section 4: Agent orchestration (new explicit step with delegation map and handoff protocol)
5. Section 5: Documentation structure (added `docs/researchReports/`)
6. Section 6: Initial ADR (rewritten to be about Copilot agent setup, not just docs structure)
7. Section 7: Security baseline (now writes to `docs/researchReports/` instead of `docs/context/`)
8. Section 8: `/sync-agents` step (new — mandatory conclusion)
9. Section 9: Optional baseline setup (env config, IDE config, pre-commit, templates, CI/CD docs — all consolidated and clearly conditional)
10. Section 10: Summary report

**Key behavioral changes:**
- AGENTS.md coding standards section now explicitly requires detected patterns, not invented conventions
- `docs/researchReports/` added as a formal, reference-grade research type distinct from informal `docs/context/` notes
- Orchestration step documents delegation map and handoff protocol explicitly
- `/sync-agents` added as mandatory final step with explanation of what it propagates
- Optional baseline items have explicit skip conditions to prevent unnecessary work
- Security baseline now writes to `docs/researchReports/` (more appropriate — reference-grade)
- Added `model: gpt-4.1` frontmatter field per prompt standards

## Open Questions

- Should `docs/researchReports/` and `docs/context/` be merged into one type, or is the formal/informal distinction valuable enough to maintain both?
- Should the prompt auto-detect whether `/sync-agents` is available (skill installed) before instructing the user to run it?
