# Project Task Tracker

Last Updated: 2026-02-20

> Living document for major project tasks. Update status continuously during planning and implementation.

## Agent Quality
- [x] Standardize all root agent artifacts with Role/Scope/Inputs/Process/Output/Handoffs/Limits structure
- [x] Add explicit inter-agent handoff contracts (code-reviewer ↔ security-specialist, research-agent → documentation-specialist, copilot-engineer ↔ prompt-engineer)
- [x] Remove tool-specific hard-references (context7) from research-agent for portability
- [x] Fix documentation-specialist as default owner for context-note creation
- [x] Fix broken `agents/README.md` reference in copilot-engineer → `docs/README.agents.md`
- [x] Fix path/casing errors in `.github/copilot-instructions.md` (`Agents/` → `agents/`, etc.)
- [x] Add four missing agents to `docs/README.agents.md` catalog
- [x] Fix broken skill path reference in `ReadMe.md`
- [x] Add `onboarding-expanded` specialist agents and conditional onboarding install/delegation logic
- [x] Update agent tools to match current GitHub Copilot documentation
- [x] Update copilot-engineer agent to reference current tools documentation
- [x] Add testing-specialist and infrastructure-specialist onboarding-expanded agents

## Onboarding
- [x] Run repository analysis and detect tech stack
- [x] Establish docs structure (`docs/architecture/`, `docs/adr/`, `docs/context/`)
- [x] Create initial ADR (`docs/adr/0001-adopt-documentation-structure.md`)
- [ ] Generate onboarding summary report

## Architecture & Documentation
- [x] Add/update architecture documentation
- [x] Add context/research notes and update `docs/context/index.md`
- [x] Record new architectural decisions as ADRs

## Security & Quality
- [ ] Run dependency/security audit
- [ ] Review secret handling and `.gitignore` coverage
- [ ] Address critical/high findings

## Blocked
- [ ] # TODO: Add blocked tasks here with dependency notes (e.g., waiting on approvals, access, vendor responses)

## Follow-ups
- [ ] # TODO: Add team-specific onboarding tasks
- [ ] # TODO: Assign owners and due dates for open items

## Definition of Done
- [ ] Acceptance criteria are met
- [x] Relevant docs are updated (`README`, ADRs, context notes, or architecture docs as applicable)
- [ ] Security/quality checks for the change are completed
- [ ] Any follow-up work is captured as new TODO items
