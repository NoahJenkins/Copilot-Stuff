# 2026-02-20 Onboarding Expanded Agent Selection

## Summary
Onboarding now distinguishes mandatory `onboarding-core` agents from optional `onboarding-expanded` specialists. The expanded set is installed only when repository signals (or greenfield intended stack inputs) indicate a relevant specialization.

## Findings
- Existing onboarding behavior already used tag metadata for mandatory agent selection.
- Installation logic was extended to support conditional optional specialists without weakening mandatory core guarantees.
- Four optional specialists were added to root `agents/` with `onboarding-expanded` tags:
  - `frontend-specialist.agent.md`
  - `backend-specialist.agent.md`
  - `data-specialist.agent.md`
  - `devops-specialist.agent.md`
- Failure behavior now differs by category:
  - `onboarding-core` failure remains blocking.
  - `onboarding-expanded` failure is non-blocking and reported as warning.

## Open Questions
- Should optional expanded selection be purely tag-driven from canonical metadata or continue to include heuristic stack mapping in the onboarding prompt?
- Should additional expanded specialists (for example mobile or platform engineering) be introduced now or deferred until demand appears?

## Related
- [ADR 0002](../adr/0002-adopt-core-plus-expanded-onboarding-agent-model.md)
- [Agents catalog updates](../README.agents.md)
