# 2026-03-12 Test-Artifact Copilot CLI Hardening

## Summary

Refined the `test-artifact` workflow to reduce Copilot CLI test flakiness and make report generation reproducible. The update introduces dual execution modes (manual interactive and scripted interactive), repo-root path stabilization, and explicit stuck-session diagnostics.

## Findings

- Manual-only workflows were prone to ambiguity during long-running prompt execution.
- Relative `cd testing_sandbox` assumptions failed when shell cwd drifted.
- Reports needed deterministic transcript capture guidance, including exact command provenance.

## Changes Applied

- Updated `.github/skills/test-artifact/SKILL.md` with:
  - Repo-root resolution before sandbox execution
  - Dual execution modes
  - Transcript capture requirements (path and exact command)
  - Stuck-session checks and targeted Copilot CLI process termination
  - Shell fallback note for environments without `rg`
- Added ADR 0007 to document the behavioral decision.
- Updated architecture docs and index references.

## Open Questions

- Should we add a small helper script in `testing_sandbox/` that wraps the scripted interactive mode to further reduce command drift?