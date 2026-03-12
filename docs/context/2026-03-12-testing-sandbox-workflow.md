# 2026-03-12 Testing Sandbox Workflow

## Summary

Implemented a standardized workflow for validating distributable artifacts in the
repository using `testing_sandbox/` as the dedicated local test target.

## What Changed

- Added `.github/skills/test-artifact/SKILL.md` to define end-to-end artifact testing workflow.
- Added `testing_sandbox/AGENTS.md` as path-scoped sandbox guidance.
- Added root pointers in `AGENTS.md` and `CLAUDE.md` for discoverability.
- Added `docs/testingResults/README.md` and report naming conventions.
- Kept `test-artifact` as an internal repository skill under `.github/skills/` (not part of distributable `skills/` catalog).

## Key Workflow Decisions

- Detailed testing steps belong in a skill, not root AGENTS content.
- `.instructions.md` artifacts are first-class testing targets.
- Sandbox config files may be modified during tests; app/runtime files are read-only by default.
- Optional sandbox cleanup command: `git checkout testing_sandbox/`.

## Documentation and Decision Links

- ADR: `docs/adr/0006-test-artifact-skill-over-agents-md.md`
- Related policy baseline: `docs/adr/0005-enforce-concise-root-agents-with-nested-overlays.md`