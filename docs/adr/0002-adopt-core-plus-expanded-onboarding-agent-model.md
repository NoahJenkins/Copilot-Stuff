# ADR 0002: Adopt Core + Expanded Onboarding Agent Model

## Status
Accepted

## Context
Onboarding required a universal baseline of agents that works in any repository while also supporting stack-specific depth when relevant. A single mandatory list cannot efficiently cover both goals:

- Too few mandatory roles leaves stack-specific workflows underserved.
- Too many mandatory roles adds noise and unnecessary installs in repositories that do not need those specialists.

The repository already uses onboarding tags and canonical raw artifact installation, making tag-based role stratification a natural extension.

## Options considered

### Option 1: Keep only mandatory universal agents
**Pros**
- Simple installation behavior
- Minimal setup surface area

**Cons**
- Insufficient specialization for frontend/backend/data/devops-heavy repos
- More work handled by generic agents, reducing quality for stack-specific tasks

### Option 2: Make all specialists mandatory
**Pros**
- Maximum capability available immediately
- No selection logic required during execution

**Cons**
- Unnecessary agents installed in many repos
- Higher maintenance and onboarding noise
- Poor fit for small or narrow-scope projects

### Option 3: Two-tier model (mandatory core + optional expanded)
**Pros**
- Universal baseline remains stable
- Optional specialists can be installed only when detected stack requires them
- Preserves portability across language/framework combinations

**Cons**
- Requires selection logic and optional-failure handling
- Slightly more complex onboarding rules

## Decision
Adopt a two-tier onboarding model:

1. `onboarding-core` agents are mandatory and blocking on installation failure.
2. `onboarding-expanded` agents are optional and selected by detected repository signals (or greenfield intended stack), with non-blocking failure behavior.

Initial expanded specialists:
- `frontend-specialist`
- `backend-specialist`
- `data-specialist`
- `devops-specialist`

## Consequences

### Positive
- Onboarding stays repo-agnostic at baseline while adding targeted depth where needed.
- Installation overhead is proportional to repo complexity.
- Delegation can be more precise for stack-specific workflows.

### Negative
- Heuristic detection can be imperfect in mixed or atypical repositories.
- More artifacts to maintain in the agent catalog.

### Mitigations
- Keep mandatory core unchanged and robust.
- Treat optional-install failures as warnings, not blockers.
- Maintain clear tag metadata and delegation mapping in onboarding prompt and docs.
