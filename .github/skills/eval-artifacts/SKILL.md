---
name: eval-artifacts
description: LLM-as-judge scoring skill. Takes a transcript + sandbox state, applies the rubric, and produces a structured score report in docs/testingResults/.
---

# Eval Artifacts

Score a completed `test-artifact` run against a rubric. Produces a structured `YYYY-MM-DD-<artifact>-eval.md` report in `docs/testingResults/`.

Can be run on **historical transcripts** (no re-test required) to validate rubric calibration.

---

## Inputs

| Input | Default | Description |
|-------|---------|-------------|
| `transcript` | *(required)* | Path to transcript file (e.g., `docs/testingResults/2026-03-12-onboard-copilot-cli-output.txt`) |
| `rubric` | `docs/eval-rubrics/onboard-copilot-rubric.md` | Path to rubric file |
| `sandbox` | `testing_sandbox/` | Path to sandbox directory to inspect |
| `artifact` | derived from transcript path | Short artifact name for report naming |
| `date` | today | Date prefix for report naming |

---

## Workflow

### Step 1 — Resolve Paths

```bash
REPO_ROOT="$(git rev-parse --show-toplevel)"
TRANSCRIPT="<transcript-path>"     # absolute or relative to REPO_ROOT
RUBRIC="$REPO_ROOT/docs/eval-rubrics/onboard-copilot-rubric.md"
SANDBOX="$REPO_ROOT/testing_sandbox"
ARTIFACT="onboard-copilot"         # derived from transcript filename if not specified
EVAL_DATE="$(date +%Y-%m-%d)"
OUT="$REPO_ROOT/docs/testingResults/${EVAL_DATE}-${ARTIFACT}-eval.md"
```

### Step 2 — Infrastructure Classification

Read the transcript and run these checks to classify the run before scoring:

```bash
# Byte count and line count
wc -c "$TRANSCRIPT"
wc -l "$TRANSCRIPT"

# Check for normal exit indicators
grep -c "/exit\|Session ended\|Goodbye" "$TRANSCRIPT" || true

# Tail for timeout/kill indicators
tail -n 20 "$TRANSCRIPT"
```

Classify as:
- `clean` — transcript ≥ 100 bytes, ≥ 5 lines, ends with normal exit indicator
- `timeout` — transcript is substantive but ends abruptly (no exit indicator, or tail shows kill signal)
- `infra-fail` — transcript < 100 bytes OR < 5 lines

If `infra-fail`: award 5 pts to all sections (N/A), write report, stop.

### Step 3 — Mechanical Checks

Run the bash checks for each rubric section. For each check, record pass/fail and the exact command output.

**Section 1 — Codebase Analysis:**
```bash
grep -ic "next\|typescript\|tailwind\|react\|next\.js" "$TRANSCRIPT" || echo "0 matches"
```

**Section 2 — Coding Standards:**
```bash
test -f "$SANDBOX/AGENTS.md" && wc -l "$SANDBOX/AGENTS.md" || echo "AGENTS.md not found"
grep -ic "\[TODO\]\|\[PLACEHOLDER\]" "$SANDBOX/AGENTS.md" || echo "0 matches"
```

**Section 3 — Agent Installation:**
```bash
ls "$SANDBOX/.github/agents/" 2>/dev/null || echo "no agents directory"
for agent in copilot-engineer documentation-specialist prompt-engineer research-agent; do
  test -f "$SANDBOX/.github/agents/${agent}.agent.md" && echo "FOUND: $agent" || echo "MISSING: $agent"
done
wc -c "$SANDBOX/.github/agents/"*.agent.md 2>/dev/null || echo "no agent files"
grep -l "^name:" "$SANDBOX/.github/agents/"*.agent.md 2>/dev/null || echo "no frontmatter"
```

**Section 4 — Agent Orchestration:**
```bash
grep -ic "delegat\|orchestrat\|handoff\|specialist" "$SANDBOX/AGENTS.md" || echo "0 matches"
```

**Section 5 — Docs Structure:**
```bash
for dir in adr architecture context researchReports; do
  test -d "$SANDBOX/docs/$dir" && echo "EXISTS: $dir" || echo "MISSING: $dir"
done
test -s "$SANDBOX/docs/TODO.md" && echo "EXISTS: TODO.md" || echo "MISSING: TODO.md"
```

**Section 6 — Initial ADR:**
```bash
ls "$SANDBOX/docs/adr/"000*.md 2>/dev/null || echo "no ADR files"
grep -l "## Status" "$SANDBOX/docs/adr/"*.md 2>/dev/null || echo "no status sections"
```

**Section 7 — Security Baseline:**
```bash
find "$SANDBOX/docs" -name "*security-baseline*" 2>/dev/null || echo "not found"
```

**Section 8 — Sync:**
```bash
grep -ic "sync-agents\|sync_agents" "$TRANSCRIPT" || echo "0 matches"
test -f "$SANDBOX/CLAUDE.md" && echo "CLAUDE.md exists" || echo "CLAUDE.md missing"
```

**Section 9 — Optional Baseline:**
```bash
find "$SANDBOX/docs/architecture" -name "*.md" -size +0c 2>/dev/null || echo "no architecture docs"
```

**Section 10 — Summary Report:**
```bash
ls "$SANDBOX/docs/context/"????-??-??-*.md 2>/dev/null || echo "no context notes"
```

### Step 4 — Content Quality Checks (LLM)

Read and assess the following for LLM-judged criteria:

- **Section 1**: Read transcript (first 100 lines). Does analysis language precede create/write language?
- **Section 2**: Read `testing_sandbox/AGENTS.md` coding standards section. Are rules project-specific or generic?
- **Section 4**: Read orchestration/delegation section. Are all 4 agents named? Is when-to-delegate criteria present?
- **Section 6**: Read first ADR file. Are all 4 required sections present?
- **Section 7**: Read security baseline file. Does it reference sandbox-specific details?
- **Section 8**: Read transcript around sync invocation. Any error lines after sync?
- **Section 10**: Read context note. Compare checklist items to actual filesystem. Any false positives?

### Step 5 — Apply Section Scores

For each section, apply the rubric point allocations based on mechanical check results and LLM assessments.

For `timeout` runs, apply N/A (5 pts) to sections with no observable output in the partial transcript.

### Step 6 — Write Eval Report

Write the report to `$OUT` using this template:

```markdown
# Eval Report: <artifact>

- Date: YYYY-MM-DD
- Transcript: <path>
- Rubric: docs/eval-rubrics/onboard-copilot-rubric.md
- Sandbox: testing_sandbox/
- Infrastructure Track: clean | timeout | infra-fail

## Score Summary

| # | Section | Score | Notes |
|---|---------|-------|-------|
| 1 | Codebase Analysis | X/10 | |
| 2 | Coding Standards | X/10 | |
| 3 | Agent Installation | X/10 | |
| 4 | Agent Orchestration | X/10 | |
| 5 | Docs Structure | X/10 | |
| 6 | Initial ADR | X/10 | |
| 7 | Security Baseline | X/10 | |
| 8 | Sync | X/10 | |
| 9 | Optional Baseline | X/10 | |
|10 | Summary Report | X/10 | |
| | **Total** | **X/100** | |

**Verdict:** pass | conditional-pass | fail

## Mechanical Check Results
<paste bash command outputs>

## Section Details
<for each section: points awarded, checks that passed/failed, LLM reasoning>

## Lowest-Scoring Sections
1. Section X (Y/10) — <one-line reason>
2. Section X (Y/10) — <one-line reason>
3. Section X (Y/10) — <one-line reason>

## Improvement Targets
<one paragraph: what prompt changes would most improve the lowest-scoring sections>
```

### Step 7 — Confirm Report Written

```bash
test -s "$OUT" && echo "eval report written: $OUT" || echo "ERROR: report not written"
wc -l "$OUT"
```

---

## Running on Historical Transcripts

This skill works on any existing transcript without re-running the test:

```
Evaluate the March 12 transcript:
- transcript: docs/testingResults/2026-03-12-onboard-copilot-cli-output.txt
- sandbox: testing_sandbox/
```

The sandbox state at evaluation time must reflect the run being evaluated. If the sandbox has been reset (`git checkout testing_sandbox/`), Section scores for filesystem checks will not reflect the run and should be marked N/A.

---

## Integration with research-loop

The "Lowest-Scoring Sections" block in the eval report is the primary input to the `research-loop` skill. Keep this block structured (numbered list, section name, score, one-line reason) so `research-loop` can parse it without ambiguity.
