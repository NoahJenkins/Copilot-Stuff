# onboard-copilot test results

- Date: 2026-03-12
- Artifact: prompts/onboard-copilot.prompt.md
- Sandbox target: testing_sandbox/

## Setup
- Validated prompt frontmatter includes required `description` field.
- Cleared prior Copilot CLI processes before execution.
- Ran test from `testing_sandbox/` using hardened scripted interactive Mode B (input-file redirection + runtime bound).

## Test Actions
- Performed one fresh post-hardening scripted interactive run from `testing_sandbox/` after process cleanup.
- Captured transcript to `docs/testingResults/2026-03-12-onboard-copilot-cli-output.txt`.

```bash
pkill -f '/opt/homebrew/Caskroom/copilot-cli/.*/copilot' || true
pkill -x copilot || true

REPO_ROOT="$(git rev-parse --show-toplevel)"
PROMPT="$REPO_ROOT/prompts/onboard-copilot.prompt.md"
OUT="$REPO_ROOT/docs/testingResults/2026-03-12-onboard-copilot-cli-output.txt"
cd "$REPO_ROOT/testing_sandbox"
INPUT_FILE="$(mktemp)"

: > "$OUT"
{ printf '/model gpt-5-mini\n'; cat "$PROMPT"; printf '\n/exit\n'; } > "$INPUT_FILE"
copilot --allow-all-tools --output-format text < "$INPUT_FILE" > "$OUT" 2>&1 &
cp_pid=$!

# runtime bound
elapsed=0
limit=300
while kill -0 "$cp_pid" 2>/dev/null; do
  sleep 1
  elapsed=$((elapsed + 1))
  if [ "$elapsed" -ge "$limit" ]; then
    kill "$cp_pid" 2>/dev/null || true
    sleep 1
    kill -9 "$cp_pid" 2>/dev/null || true
    break
  fi
done

wait "$cp_pid" 2>/dev/null || true
rm -f "$INPUT_FILE"

wc -c "$OUT"
wc -l "$OUT"
tail -n 40 "$OUT"
ps aux | grep -E '[ /]copilot($| )' | grep -v grep || echo 'no copilot CLI processes'
```

## Observed Behavior
- Transcript was substantive and captured live prompt execution.
  - Size: 3504 bytes
  - Lines: 115
- Copilot analyzed the sandbox and began executing onboarding workflow steps.
- Command-safety blocking did not appear in this run; execution reached edit/create steps.
- The session exceeded the 300-second bound and was forcibly terminated.
- Infrastructure gates failed for this attempt because process-cleanliness was not satisfied at gate-check time.
- This run modified sandbox files during execution (`testing_sandbox/AGENTS.md`, `testing_sandbox/.vscode/`, `testing_sandbox/docs/TODO.md`, `testing_sandbox/docs/context/index.md`, `testing_sandbox/docs/context/2026-03-12-security-baseline.md`).

## Verdict
- Pass/Fail: partial
- Rationale: The hardened Mode B flow improved behavior (no blocked-command errors; meaningful execution and edits), but the run still failed completion reliability because it did not finish within bounded runtime and required forced process termination.

## Recommended Improvements
1. Add execution-phase checkpoints in `onboard-copilot` so long tasks can stop at a deterministic milestone and exit cleanly.
2. Add an adaptive runtime bound (for example, 300s for short prompts, 600s for heavy onboarding prompts) to reduce false timeout failures.
3. Keep infrastructure-gate classification separate from artifact-quality scoring, and always record whether process cleanup was required.
