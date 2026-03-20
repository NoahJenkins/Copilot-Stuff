# Project Task Tracker

Last Updated: 2026-03-20

> Living document for major project tasks. Update status continuously during planning and implementation.

## Onboarding
- [x] Run codebase analysis and extract coding standards
- [x] Author AGENTS.md with detected coding standards (2026-03-20: created from scratch, brownfield-derived)
- [x] Author docs/AGENTS.md with documentation process rules and agent handoff protocol
- [x] Install and verify onboarding-core agents (5 total: 4 core + frontend-specialist)
- [x] Define agent orchestration patterns
- [x] Establish docs structure (adr/, architecture/, context/, researchReports/)
- [x] Create initial ADR (0001-adopt-documentation-structure)
- [x] Create ADR 0002-adopt-copilot-agent-setup (2026-03-20)
- [x] Create formal security baseline in docs/researchReports/ (2026-03-20)
- [ ] Run /sync-agents to propagate AGENTS.md to Claude Code, Cursor, Windsurf

## Architecture & Documentation
- [x] Add/update architecture documentation
- [x] Add context/research notes and update `docs/context/index.md`
- [x] Record new architectural decisions as ADRs

## Security & Quality
- [x] Run dependency/security audit
- [x] Review secret handling and `.gitignore` coverage
- [x] Address critical/high findings
- [x] Execute dependency remediation plan (`docs/context/2026-03-02-dependency-remediation-plan.md`) *(Phase 1 + Phase 2 complete)*
- [x] Add Dependabot or Renovate for automated security updates
- [x] Add CI audit gate for dependency vulnerabilities
- [x] Modernize direct React dependencies (patch-level)
- [ ] Evaluate ESLint 10 adoption after plugin ecosystem compatibility updates
- [x] Security baseline re-run 2026-03-12: 0 vulnerabilities across 431 dependencies

## Blocked
- [x] # TODO: Decide whether to standardize on pnpm-only lockfile strategy (`package-lock.json` vs `pnpm-lock.yaml`)
- [x] # TODO: Resolve multi-lockfile workspace warning during Next build (remove unused lockfile or set explicit Turbopack root)

## Follow-ups

- [ ] Add CI workflow(s) to run lint, audit, and tests on PRs
- [ ] Add a test framework and CI test job (e.g., Vitest or Jest)
- [ ] Ensure Prettier is added to devDependencies or remove it from pre-commit hooks
- [ ] Verify Pre-commit configuration across contributor platforms
- [ ] Assign owner for dependency remediation and schedule
- [ ] Evaluate ESLint 10 adoption after plugin ecosystem compatibility updates
- [ ] Install pre-commit hooks after cloning: `pip install pre-commit && pre-commit install`

## Definition of Done
- [x] Acceptance criteria are met
- [x] Relevant docs are updated (`README`, ADRs, context notes, or architecture docs as applicable)
- [x] Security/quality checks for the change are completed
- [x] Any follow-up work is captured as new TODO items
