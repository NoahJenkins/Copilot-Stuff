# Context Notes Index

## 2026

- [2026-03-12 sync-agents: Nested AGENTS.md Support](./2026-03-12-sync-agents-nested-agents-md.md)
  - Nested AGENTS.md files (outside root and .github/) are now treated as directory-scoped sources of truth, synced to matching CLAUDE.md and GEMINI.md files in the same directory.

- [2026-03-12 OnboardCopilot Brownfield Refocus](./2026-03-12-onboard-copilot-brownfield-refocus.md)
  - Refocused onboard-copilot prompt to be brownfield-first with dedicated coding standards extraction, explicit agent orchestration step, docs/researchReports/ type, and mandatory /sync-agents conclusion.

- [2026-03-12 OnboardCopilot Sandbox Fix Pass 2](./2026-03-12-onboard-copilot-sandbox-fix-pass-2.md)
  - Second sandbox review pass: fixed index.md append behavior (append below last entry, never prepend), ADR numbering (list all existing files to find next number), security baseline deduplication (check both context/ and researchReports/), agent install stub issue (single-operation write, no pre-created stubs), and expanded agent omission from delegation list.

- [2026-03-12 Test-Artifact Mode B Breakpoint Remediation](./2026-03-12-test-artifact-mode-b-breakpoint-remediation.md)
  - Replaced pipe-based scripted input with input-file redirection plus timeout bounds, added infrastructure completion gates, bounded retries, and fallback to manual mode.
  - Related ADR: [ADR 0008](../adr/0008-remediate-test-artifact-mode-b-breakpoint.md)

- [2026-03-12 Test-Artifact CLI Session Reliability](./2026-03-12-test-artifact-cli-session-reliability.md)
  - Added process-hardening corrections for `test-artifact` Copilot CLI testing: correct model command usage, stale-session cleanup, explicit transcript completeness checks, and infrastructure-failure retry guidance.

- [2026-03-12 Test-Artifact Copilot CLI Hardening](./2026-03-12-test-artifact-copilot-cli-hardening.md)
  - Hardened `test-artifact` Copilot CLI execution with dual modes (manual + scripted interactive), repo-root path stabilization, and stuck-session handling guidance for reproducible transcripts.
  - Related ADR: [ADR 0007](../adr/0007-harden-test-artifact-copilot-cli-execution.md)

- [2026-03-12 Testing Sandbox Workflow](./2026-03-12-testing-sandbox-workflow.md)
  - Added a `test-artifact` skill and a `testing_sandbox/AGENTS.md` overlay to standardize artifact validation in the sandbox, with dated feedback reports written to `docs/testingResults/`.
  - Related ADR: [ADR 0006](../adr/0006-test-artifact-skill-over-agents-md.md)

- [2026-02-20 Documentation Update Policy](./2026-02-20-documentation-update-policy.md)
  - Related ADR: [ADR 0001](../adr/0001-adopt-documentation-structure.md)

- [2026-02-20 Agent Enhancements](./2026-02-20-agent-enhancements.md)
  - Structured redesign of all six root agent artifacts: consistent Role/Scope/Inputs/Process/Output/Handoffs/Limits schema, inter-agent handoff contracts, path-casing fixes, and docs catalog completion.

- [2026-02-20 Onboarding Expanded Agent Selection](./2026-02-20-onboarding-expanded-agent-selection.md)
  - Related ADR: [ADR 0002](../adr/0002-adopt-core-plus-expanded-onboarding-agent-model.md)

- [2026-02-20 Testing and Infrastructure Agents](./2026-02-20-testing-infrastructure-agents.md)
  - Added testing-specialist and infrastructure-specialist as onboarding-expanded agents to close coverage gaps in QA and cloud infrastructure domains.

- [2026-02-20 Agent Tools Update](./2026-02-20-agent-tools-update.md)
  - Updated the tools used by the agents in the `agents/` directory to match the current GitHub Copilot custom agents configuration documentation.

- [2026-02-20 Agent Orchestration](./2026-02-20-agent-orchestration.md)
  - Added explicit agent orchestration instructions to `.github/copilot-instructions.md` for delegating tasks to the four core agents in `.github/agents/`.

- [2026-02-20 Sync Agents Update](./2026-02-20-sync-agents-update.md)
  - Updated the `sync-agents` skill to explicitly instruct the agent to completely overwrite the existing file content when inserting the content of `.github/copilot-instructions.md` to prevent duplication.

- [2026-03-11 AI Tools Guide and AGENTS.md Universal Standard](./2026-03-11-ai-tools-guide-and-agents-md.md)
  - Researched AGENTS.md universal adoption (GitHub Copilot Aug 2025+). Created docs/README.ai-tools-guide.md, root AGENTS.md and CLAUDE.md, ADR 0003, and updated sync-agents skill to reflect AGENTS.md's expanded tool support.
  - Related ADR: [ADR 0003](../adr/0003-adopt-agents-md-as-universal-standard.md)

- [2026-03-11 AGENTS.md as Source of Truth Migration](./2026-03-11-agents-md-source-of-truth.md)
  - Updated sync-agents to read FROM AGENTS.md (fallback: copilot-instructions.md) and updated onboard-copilot to create AGENTS.md instead of copilot-instructions.md. Eliminates context duplication when both files coexist in a repo.
  - Related ADR: [ADR 0004](../adr/0004-agents-md-as-sync-source-of-truth.md)

- [2026-03-11 sync-agents Step 2 and Step 5 Corrections](./2026-03-11-sync-agents-step2-step5-corrections.md)
  - Removed AGENTS.md as Codex detection signal (caused false-positive detection in all repos). Removed false `.agents/skills/` target from Step 5 (no documented Codex skills convention). Confirmed Claude Code uses `.claude/skills/` (live-tested). Deleted orphaned `.agents/` directory.

- [2026-03-11 Concise Root AGENTS and Nested Overlays](./2026-03-11-concise-root-agents-nested-overlays.md)
  - Refactored onboard-copilot to enforce root `AGENTS.md` under 100 lines and move verbose/scoped guidance to nested `AGENTS.md` files.
  - Related ADR: [ADR 0005](../adr/0005-enforce-concise-root-agents-with-nested-overlays.md)
