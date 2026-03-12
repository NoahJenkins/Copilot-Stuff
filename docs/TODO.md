# Project Task Tracker

Last Updated: 2026-03-12

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
- [x] Add agent orchestration instructions to `.github/copilot-instructions.md`
- [x] Update `sync-agents` skill to prevent appending duplicate content
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

## Skills
- [x] Create `dependabot-automation` skill (Dependabot auto-merge, branch protection alignment, XSS remediation)
- [x] Update `sync-agents` skill to reflect AGENTS.md universal standard (detection table, fallback behavior, section headings, reporting)
- [x] Update `sync-agents` skill to use AGENTS.md as source of truth (fallback to copilot-instructions.md)
- [x] Fix `sync-agents` Step 2: remove AGENTS.md as Codex detection signal (caused false-positive detection in all repos)
- [x] Fix `sync-agents` Step 5: remove false `.agents/skills/` Codex target; Claude Code `.claude/skills/` confirmed working
- [x] Delete orphaned `.agents/` directory (created by previous incorrect skill sync)
- [x] Update `onboard-copilot` prompt to create AGENTS.md instead of copilot-instructions.md
- [x] Refactor `onboard-copilot` prompt to enforce root `AGENTS.md` under 100 lines with nested `AGENTS.md` decomposition guidance
- [x] Create internal `.github/skills/test-artifact/SKILL.md` for testing prompts/agents/instructions/skills against `testing_sandbox/`
- [ ] Add quarterly Dependabot allowlist review reminder
- [ ] Add regression tests for RSS/metadata/template output sinks (per-project follow-up)

## Documentation
- [x] Create `docs/README.ai-tools-guide.md` — AI artifact decision guide with ASCII decision tree
- [x] Create root `AGENTS.md` and `CLAUDE.md` with contributor context for AI tools working in this repo
- [x] Create ADR 0003: Adopt AGENTS.md as universal standard (docs/adr/0003-adopt-agents-md-as-universal-standard.md)
- [x] Add context note: 2026-03-11 AI tools guide and AGENTS.md research
- [x] Create ADR 0004: AGENTS.md as source of truth for sync-agents and onboard-copilot
- [x] Add context note: 2026-03-11 AGENTS.md source of truth migration
- [x] Add root testing sandbox policy pointers to `AGENTS.md` and `CLAUDE.md`
- [x] Create `docs/testingResults/` reporting directory and README guidance
- [x] Create ADR 0006 for test-artifact workflow decision
- [x] Add context note: 2026-03-12 testing sandbox workflow

## Definition of Done
- [ ] Acceptance criteria are met
- [x] Relevant docs are updated (`README`, ADRs, context notes, or architecture docs as applicable)
- [ ] Security/quality checks for the change are completed
- [ ] Any follow-up work is captured as new TODO items
