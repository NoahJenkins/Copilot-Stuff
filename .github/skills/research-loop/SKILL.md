---
name: research-loop
description: Iterative prompt improvement loop (Karpathy autoresearch pattern). One iteration per invocation — run → score → hypothesize → apply → re-test → commit if improved, revert if regressed. Human-supervised; designed for single-turn skills.
---

# Research Loop

One iteration of the autoresearch-inspired prompt improvement loop. Run this skill repeatedly to improve `onboard-copilot` (or another target prompt) toward a target score.

**Human-supervised by design.** Each invocation does one iteration and stops, so a human can review the hypothesis and result before the next iteration runs. This prevents runaway prompt degradation.

---

## Stopping Criteria (checked at start of each invocation)

Before running an iteration, check these stopping conditions:

```bash
REPO_ROOT="$(git rev-parse --show-toplevel)"

# Count consecutive reverts from recent eval reports
ls -t "$REPO_ROOT/docs/context/"????-??-??-research-loop-iteration-*.md 2>/dev/null | head -5

# Count total iterations
ls "$REPO_ROOT/docs/context/"????-??-??-research-loop-iteration-*.md 2>/dev/null | wc -l

# Read latest eval score
LATEST_EVAL="$(ls -t "$REPO_ROOT/docs/testingResults/"*-eval.md 2>/dev/null | head -1)"
test -n "$LATEST_EVAL" && grep "Total" "$LATEST_EVAL" | head -1
```

**Stop and report to user if:**
- Latest score ≥ 85/100 — target reached
- 3 or more consecutive iterations ended in "revert" — stuck; escalate to human for rubric or prompt structural review
- 10 or more total iterations reached — manual review checkpoint
- Any section at 0 after 3 iterations — infrastructure problem, not prompt problem; stop improving and fix the test setup

If stopping criteria not met, proceed with the iteration.

---

## Workflow

### Phase 1 — Baseline Check

Read the most recent eval report from `docs/testingResults/`:

```bash
REPO_ROOT="$(git rev-parse --show-toplevel)"
LATEST_EVAL="$(ls -t "$REPO_ROOT/docs/testingResults/"*-onboard-copilot-eval.md 2>/dev/null | head -1)"
echo "Latest eval: $LATEST_EVAL"
```

**If no eval report exists:**
1. Invoke `test-artifact` (Mode B) against `prompts/onboard-copilot.prompt.md`
2. Invoke `eval-artifacts` against the resulting transcript
3. Record as Iteration 0 (baseline) — do not apply any prompt changes yet
4. Write `docs/context/YYYY-MM-DD-research-loop-iteration-0.md` with baseline score
5. Stop this invocation — next invocation will begin iteration 1

**If eval report exists:** read the current score and "Lowest-Scoring Sections" block. Note the iteration number (N-1 from the last iteration file).

### Phase 2 — Hypothesis

Read the "Lowest-Scoring Sections" block from the latest eval report.

Generate **one narrow, testable hypothesis** targeting the lowest-scoring section. A good hypothesis:
- Changes a single behavior in the prompt (not a structural rewrite)
- Is specific enough to test: "adding explicit instruction to check for existing ADRs before numbering" not "improve ADR section"
- Has a plausible causal link to the failing check

Read the current prompt:

```bash
cat "$REPO_ROOT/prompts/onboard-copilot.prompt.md"
```

Identify the exact lines responsible for the failing section. Write the hypothesis as:

```
Hypothesis: <one-line statement of the change and expected effect>
Target section: Section X — <section name>
Current score: X/10
Change: <file>:<line range> — <description of edit>
```

### Phase 3 — Apply

Make a **surgical edit** to `prompts/onboard-copilot.prompt.md`. Limit the change to:
- Adding or rewording 1-3 instructions
- Removing an ambiguous instruction
- Adding a concrete example or format constraint

Do not restructure the prompt, reorder sections, or change the prompt's overall framing.

Record the exact diff:

```bash
git diff prompts/onboard-copilot.prompt.md
```

Write the hypothesis note to `docs/context/YYYY-MM-DD-research-loop-hypothesis-N.md`:

```markdown
# Research Loop Hypothesis N

- Date: YYYY-MM-DD
- Iteration: N
- Target Section: Section X — <name>
- Prior Score: X/100

## Hypothesis
<one-line statement>

## Change Applied
<file>:<line range>

## Diff
```diff
<paste git diff output>
```

## Expected Effect
<what should improve and why>
```

### Phase 4 — Re-test

Run Mode B test of the modified prompt:

```bash
REPO_ROOT="$(git rev-parse --show-toplevel)"
cd "$REPO_ROOT/testing_sandbox"

# Clean up any prior sandbox state
git checkout "$REPO_ROOT/testing_sandbox/" 2>/dev/null || true

# Kill stale Copilot processes
pkill -f '/opt/homebrew/Caskroom/copilot-cli/.*/copilot' || true
pkill -x copilot || true

ITER_DATE="$(date +%Y-%m-%d)"
OUT="$REPO_ROOT/docs/testingResults/${ITER_DATE}-onboard-copilot-iter-N-cli-output.txt"
INPUT_FILE="$(mktemp)"
TIMEOUT_BIN="$(command -v gtimeout || command -v timeout || true)"

{ printf '/model gpt-5-mini\n'; cat "$REPO_ROOT/prompts/onboard-copilot.prompt.md"; printf '\n/exit\n'; } > "$INPUT_FILE"

if [ -n "$TIMEOUT_BIN" ]; then
  "$TIMEOUT_BIN" 300 copilot --allow-all-tools --output-format text < "$INPUT_FILE" > "$OUT" 2>&1 || true
else
  copilot --allow-all-tools --output-format text < "$INPUT_FILE" > "$OUT" 2>&1
fi

rm -f "$INPUT_FILE"
wc -c "$OUT"
wc -l "$OUT"
```

Then invoke `eval-artifacts` against the new transcript:
```
eval-artifacts:
  transcript: docs/testingResults/YYYY-MM-DD-onboard-copilot-iter-N-cli-output.txt
  artifact: onboard-copilot-iter-N
```

### Phase 5 — Compare

Read both eval reports and compare:

- **New score** vs **prior score**
- **Section-by-section**: did any previously passing section regress?

**Decision logic:**

| Condition | Action |
|-----------|--------|
| New score > prior score AND no previously-passing section failed | **Commit** the prompt change |
| New score = prior score | **Revert** — no improvement; log as inconclusive |
| New score < prior score | **Revert** — regression |
| New score > prior score BUT a previously-passing section failed | **Revert** — net improvement masks regression |

**To commit:**
```bash
REPO_ROOT="$(git rev-parse --show-toplevel)"
git add prompts/onboard-copilot.prompt.md
git commit -m "eval(research-loop): iteration N — score PRIOR/100 → NEW/100

Hypothesis: <one-line>
Change: prompts/onboard-copilot.prompt.md:<location>
Result: kept"
```

**To revert:**
```bash
git checkout prompts/onboard-copilot.prompt.md
```

### Phase 6 — Document

Write the iteration log to `docs/context/YYYY-MM-DD-research-loop-iteration-N.md`:

```markdown
# Research Loop Iteration N

- Date: YYYY-MM-DD
- Prior Score: X/100
- New Score: Y/100
- Result: kept | reverted

## Hypothesis
<from Phase 2>

## Change Applied
<file:location — description>

## Score Delta by Section

| Section | Prior | New | Delta |
|---------|-------|-----|-------|
| 1 Codebase Analysis | | | |
| 2 Coding Standards | | | |
| 3 Agent Installation | | | |
| 4 Agent Orchestration | | | |
| 5 Docs Structure | | | |
| 6 Initial ADR | | | |
| 7 Security Baseline | | | |
| 8 Sync | | | |
| 9 Optional Baseline | | | |
|10 Summary Report | | | |

## Decision Rationale
<why kept or reverted>

## Next Targets
<which sections remain lowest; what hypotheses to explore next>
```

---

## Git Commit Pattern

```
eval(research-loop): iteration N — score X/100 → Y/100

Hypothesis: [one-line]
Change: [file:location]
Result: kept|reverted
```

---

## File Naming Conventions

| File | Naming Pattern |
|------|---------------|
| Test transcript | `docs/testingResults/YYYY-MM-DD-onboard-copilot-iter-N-cli-output.txt` |
| Eval report | `docs/testingResults/YYYY-MM-DD-onboard-copilot-iter-N-eval.md` |
| Hypothesis note | `docs/context/YYYY-MM-DD-research-loop-hypothesis-N.md` |
| Iteration log | `docs/context/YYYY-MM-DD-research-loop-iteration-N.md` |

---

## Escalation

If stopping criteria fires (3 consecutive reverts, 10 iterations, section at 0 for 3 iterations), write a brief escalation note and surface to the user:

```
Research loop stopping: <reason>
Last score: X/100
Next recommended action: <human review of rubric | structural prompt rewrite | fix test infrastructure>
```

Do not continue iterating autonomously after a stop condition is met.
