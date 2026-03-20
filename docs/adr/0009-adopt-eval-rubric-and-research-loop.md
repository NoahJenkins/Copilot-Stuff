# ADR 0009: Adopt Eval Rubric and Research Loop for Prompt Improvement

## Status
Accepted

## Context

The March 12, 2026 test of `onboard-copilot` timed out at the 300-second limit and received a "partial" verdict. The transcript was 3504 bytes / 115 lines — substantive enough to show real execution — but there was no way to quantify what completed correctly versus what failed. Subsequent prompt improvement attempts are blocked by the absence of a signal: we cannot tell if a change made things better, worse, or had no effect.

The existing `test-artifact` skill produces a qualitative feedback report (pass/fail/partial + observations), which is sufficient for initial validation but insufficient for iterative improvement. Binary verdicts don't reveal which of the prompt's 10 workflow sections are failing, nor do they distinguish infrastructure timeouts from behavioral failures.

## Options Considered

### Option 1: Continue with manual qualitative review
Pros: No new tooling to maintain.
Cons: Continued inability to distinguish infrastructure timeouts from prompt failures. No signal for iterative improvement. "Partial" remains the state of the art.

### Option 2: Fixed checklist (binary yes/no per section)
Pros: Deterministic; no LLM judgment required.
Cons: Cannot assess content quality (e.g., "are the coding standards project-specific or generic boilerplate?"). Treats a missing file the same as a file with wrong content.

### Option 3: LLM-as-judge rubric + iterative improvement loop (Adopted)
Pros:
- Mechanical checks first (filesystem, line count, grep) — deterministic for easily-verifiable properties
- LLM judgment only for content quality checks where binary pass/fail loses information
- Two-track scoring separates infrastructure reliability from artifact quality
- Iterative loop provides commit history showing every hypothesis with before/after scores
- Human-supervised loop prevents runaway degradation
- Historical transcript scoring enables rubric calibration without re-running expensive tests
Cons:
- LLM judgment introduces some scoring variance
- Maintaining rubric as prompt evolves requires periodic rubric updates
- Each iteration requires a full 300s+ test run

## Decision

Adopt the following:

1. **`docs/eval-rubrics/onboard-copilot-rubric.md`** — 10-section rubric, 100 pts total. Mechanical checks first; LLM judgment for content quality. Two-track scoring (clean / timeout / infra-fail). Pass: 70/100 with no section at 0.

2. **`.github/skills/eval-artifacts/SKILL.md`** — LLM-as-judge scoring skill. Inputs: transcript path, rubric path, sandbox path. Outputs: structured eval report with "Lowest-Scoring Sections" block.

3. **`.github/skills/research-loop/SKILL.md`** — One iteration per invocation. Loop phases: baseline → hypothesis → apply → re-test → compare → commit or revert → document. Stopping criteria: score ≥ 85, 3 consecutive reverts, 10 iterations, any section at 0 after 3 iterations.

4. **`test-artifact` optional eval note** — Step 6 of the existing skill now references `eval-artifacts` for quantitative scoring after the feedback report is written.

The loop is **human-supervised** (one iteration per invocation) rather than fully autonomous. Prompt changes benefit from human review between iterations, and LLM-judge scoring variance means two runs of the same prompt may differ due to infrastructure noise — a human can assess whether a score delta is meaningful before committing.

## Consequences

### Positive
- Prompt improvement becomes measurable: each change has a before/after score and a commit message recording the hypothesis.
- Infrastructure timeouts no longer produce a flat "partial" verdict — two-track scoring preserves section-level signal even in timeout runs.
- Historical transcripts can be scored retroactively without re-running the test.
- "Lowest-Scoring Sections" block creates a structured feedback loop between eval and improvement.

### Negative
- LLM-judge scoring is not perfectly deterministic — rubric calibration requires running against known transcripts and adjusting criteria where scores are implausible.
- Maintaining the rubric as `onboard-copilot` evolves adds a maintenance obligation.
- Each research-loop iteration requires a full test run (~300s), so improvement is slow relative to a unit-test loop.
- The rubric is specific to `onboard-copilot`; other artifacts would need their own rubrics.
