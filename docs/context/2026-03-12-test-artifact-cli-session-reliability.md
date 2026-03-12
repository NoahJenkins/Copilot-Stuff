# 2026-03-12 Test-Artifact CLI Session Reliability

## Summary

Updated `.github/skills/test-artifact/SKILL.md` to address observed Copilot CLI execution issues during sandbox testing.

## Changes Made

- Added explicit warning to avoid `set -u` in VS Code terminal Copilot test commands due to prompt-hook unset-variable behavior.
- Clarified model command correctness:
  - Valid: `/model gpt-5-mini`
  - Invalid: `/model gpt-5 mini`
- Added pre-run Copilot CLI cleanup and verification commands to prevent nested/stale sessions.
- Updated scripted interactive command to use `printf` with explicit newlines for deterministic input framing.
- Added mandatory transcript completeness checks (`wc -c`, `wc -l`, `tail`) after scripted runs.
- Added failure classification guidance: if transcript is empty/incomplete, mark as infrastructure failure and retry after process cleanup.

## Why

Repeated test attempts showed nested/stale Copilot CLI processes and intermittently empty transcripts, which made artifact-quality evaluation unreliable. The new steps enforce a known-clean runtime state and objective transcript verification before declaring a test run valid.

## Impact

- Improves reproducibility of test runs in `testing_sandbox/`.
- Reduces false negatives caused by terminal/session state drift.
- Preserves previous workflow shape (manual + scripted modes) while hardening execution reliability.
