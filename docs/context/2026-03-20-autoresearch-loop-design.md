# Autoresearch-Inspired Eval Loop Design

- Date: 2026-03-20
- Related ADR: [ADR 0009](../adr/0009-adopt-eval-rubric-and-research-loop.md)

## Context

The March 12 test of `onboard-copilot` timed out with a "partial" verdict and no way to measure what completed correctly versus what failed. The binary pass/fail verdict makes iterative improvement difficult — we cannot tell whether a prompt change made things better, worse, or had no effect.

Andrej Karpathy's autoresearch loop pattern (read → hypothesize → modify → run → score → commit if better, revert if worse) maps directly onto prompt improvement. This design adapts that pattern to the Copilot artifact testing context.

## What Was Built

### 1. Scoring Rubric (`docs/eval-rubrics/onboard-copilot-rubric.md`)

10 sections × 10 pts = 100 pts. Mechanical checks (filesystem, line count, grep) are scored first; LLM judgment is used only for content quality criteria. This ordering minimizes subjectivity and makes the rubric deterministic for easily-verifiable properties.

**Two-track scoring** separates infrastructure reliability from artifact quality. A timeout run does not zero out sections that produced observable output — those get N/A (5 pts) to reflect uncertainty rather than failure. Only `infra-fail` runs (transcript < 100 bytes or < 5 lines) treat all sections as N/A.

Pass threshold: **70/100 with no section at 0**.

### 2. eval-artifacts skill (`.github/skills/eval-artifacts/SKILL.md`)

LLM-as-judge skill that takes a transcript + sandbox state and applies the rubric. Can run on historical transcripts without re-running the test. The first use case is scoring the March 12 transcript as a rubric calibration dry run.

Output: structured eval report with a "Lowest-Scoring Sections" block consumed by `research-loop`.

### 3. research-loop skill (`.github/skills/research-loop/SKILL.md`)

One iteration per invocation. Loop phases: baseline check → hypothesis → apply → re-test → compare → commit or revert → document. Human-supervised by design — skills are single-turn, and prompt changes benefit from a human sanity check per step.

**Stopping criteria prevent runaway degradation:**
- Score ≥ 85/100 (target reached)
- 3 consecutive reverts (stuck)
- 10 total iterations (manual review checkpoint)
- Any section at 0 after 3 iterations (infrastructure problem, not prompt problem)

## Why Human-Supervised, Not Fully Autonomous

A fully autonomous loop would need to re-run `test-artifact` (a 300s+ operation) many times without human review. The risks:
- A prompt change that improves one section while breaking another could be committed before the regression is caught
- Timeout variance means two runs of the same prompt may score differently due to infrastructure noise, not prompt quality
- Prompt engineering benefits from human judgment on hypotheses — a human can spot "this change is syntactically correct but semantically backwards" before running the test

One iteration per invocation keeps the human in the loop at the natural checkpoint (after seeing the score delta) without requiring manual work at every bash check.

## Relationship to Karpathy Autoresearch

The core loop structure is the same:
1. Score current state (eval-artifacts)
2. Hypothesize improvement (research-loop Phase 2)
3. Apply change (Phase 3)
4. Re-score (Phase 4)
5. Commit if better, revert if worse (Phase 5)

The key adaptation: autoresearch typically runs fully autonomously with code tests as the oracle. Here, the oracle is an LLM judge with mechanical pre-checks, and the "commit if better" condition includes a regression guard (no previously-passing section fails). This guards against the common failure mode of optimizing one metric while breaking another.
