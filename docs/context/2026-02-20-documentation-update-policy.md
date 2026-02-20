# Documentation Update Policy Adoption

## Summary
This repository now enforces automatic documentation updates for non-trivial code changes in the same implementation turn. The policy removes confirmation prompts when documentation targets are clear and introduces a completion gate that requires docs to be updated before work is considered complete.

## Options/Findings
- Option 1: Keep documentation updates as opt-in prompts.
  - Pros: Lower immediate overhead.
  - Cons: Inconsistent documentation hygiene and stale `docs/` content.
- Option 2: Require automatic docs impact checks and updates after implementation.
  - Pros: Consistent project history, better onboarding context, and stronger change traceability.
  - Cons: Slightly higher implementation effort per change.
- Decision support findings:
  - The project already includes prompt-driven onboarding patterns that expect ADR/context/architecture maintenance.
  - Delegating docs updates to `@documentation-specialist` aligns with existing specialized-agent workflows.

## Open Questions
- Should PR checks later enforce documentation-update policy compliance automatically?
- Should critical-path docs updates be represented as explicit checklist items in PR templates?
