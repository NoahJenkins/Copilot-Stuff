# Architecture Documentation

This directory contains high-level architecture overviews, system diagrams, and data flow documentation.

## Guidance
- Update these documents when overall system design changes significantly.
- Link related decisions from `docs/adr/`.
- Link supporting research from `docs/context/`.

## Testing Workflow Architecture

- Artifact validation is executed against `testing_sandbox/` as the dedicated local test bed.
- Workflow orchestration is defined in `.github/skills/test-artifact/SKILL.md`.
- Copilot CLI execution supports both manual interactive testing and scripted interactive testing for reproducible transcripts.
- Sandbox execution paths are stabilized by resolving the repository root before changing directories.
- Scripted interactive execution uses input-file redirection (instead of pipe-only transport) with optional timeout bounds for better termination reliability.
- Infrastructure gates require minimum transcript completeness and clean post-run Copilot process state before accepting a run.
- Mode B failures use bounded retries, then explicit fallback to manual Mode A with infrastructure-scoped verdicting.
- Test outputs are documented in `docs/testingResults/` as dated markdown reports.
- Decision record: `docs/adr/0006-test-artifact-skill-over-agents-md.md`.
- Decision record: `docs/adr/0007-harden-test-artifact-copilot-cli-execution.md`.
- Decision record: `docs/adr/0008-remediate-test-artifact-mode-b-breakpoint.md`.
