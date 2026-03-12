# 2026-03-12 Test-Artifact Mode B Breakpoint Remediation

## Summary

Implemented a reliability remediation for the `test-artifact` Copilot CLI scripted interactive path after repeated partial/stalled runs. The workflow now uses input-file stdin transport, infrastructure completion gates, bounded retries, and manual-mode fallback.

## Findings

- Pipe-based scripted stdin worked intermittently but showed unstable termination behavior in long prompt runs.
- Prompt-generated shell commands that include loop/substitution-heavy forms can trigger Copilot CLI safety blocking.
- Without explicit gates, infrastructure failures can be mistaken for artifact-quality failures.

## Changes Applied

- Updated `.github/skills/test-artifact/SKILL.md`:
  - Mode B now uses input-file redirection (`< "$INPUT_FILE"`) instead of pipe-only transport.
  - Added optional timeout wrapping using `gtimeout`/`timeout` when available.
  - Added infrastructure completion gates (minimum bytes/lines and no active Copilot process post-run).
  - Added bounded retries with backoff and a required fallback to Mode A.
- Updated `prompts/onboard-copilot.prompt.md`:
  - Added shell command safety constraints to reduce CLI command blocking and require rewrite-and-continue behavior.

## Impact

- Improves deterministic test execution and run classification.
- Reduces false negatives caused by runtime infrastructure behavior.
- Preserves existing dual-mode workflow while making Mode B failure handling explicit.

## Related

- ADR: `docs/adr/0008-remediate-test-artifact-mode-b-breakpoint.md`
- Prior context: `docs/context/2026-03-12-test-artifact-cli-session-reliability.md`
