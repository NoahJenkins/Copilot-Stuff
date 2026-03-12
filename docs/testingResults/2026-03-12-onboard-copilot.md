# onboard-copilot test results

- Date: 2026-03-12
- Artifact: prompts/onboard-copilot.prompt.md
- Sandbox target: testing_sandbox/

## Setup
- Updated `.github/skills/test-artifact/SKILL.md` with corrected reliability guidance before rerun:
  - enforce `/model gpt-5-mini` (hyphenated)
  - pre-run Copilot CLI cleanup to avoid nested sessions
  - transcript completeness checks after Mode B runs
- Verified no active Copilot CLI processes before execution.

## Test Actions
- Performed one fresh scripted interactive run from `testing_sandbox/` after cleanup.
- Captured transcript to `docs/testingResults/2026-03-12-onboard-copilot-cli-output.txt`.

```bash
pkill -f '/opt/homebrew/Caskroom/copilot-cli/.*/copilot' || true
pkill -x copilot || true

REPO_ROOT="$(git rev-parse --show-toplevel)"
OUT="$REPO_ROOT/docs/testingResults/2026-03-12-onboard-copilot-cli-output.txt"
cd "$REPO_ROOT/testing_sandbox"
: > "$OUT"
{ printf '/model gpt-5-mini\n'; cat "$REPO_ROOT/prompts/onboard-copilot.prompt.md"; printf '\n/exit\n'; } | copilot --allow-all-tools --output-format text > "$OUT" 2>&1

wc -c "$OUT"
wc -l "$OUT"
tail -n 20 "$OUT"
```

## Observed Behavior
- Transcript produced but incomplete:
  - Size: 26 bytes
  - Lines: 2
  - Content: `● skill(test-artifact)`
- No meaningful execution output for the onboard-copilot prompt was returned in this run.

## Verdict
- Pass/Fail: fail
- Rationale: The corrected single-session workflow executed, but Copilot CLI did not return substantive prompt output; artifact behavior could not be evaluated. This run is classified as infrastructure/runtime failure, not a prompt-quality failure.

## Recommended Improvements
1. Add bounded automatic retries (for example, 3 attempts with 10-20s backoff) when transcript output is below minimum thresholds.
2. Add explicit success markers in validation (for example, require transcript to include at least one analysis/action section) before accepting a run.
3. Capture `copilot --version` and environment state at report time to help correlate transient runtime issues.
