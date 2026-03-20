# Research Loop Iteration 1

- Date: 2026-03-20
- Prior Score: 94/100 (baseline with corrected Section 3 rubric)
- New Score: 87/100
- Result: **reverted**

## Rubric Correction Applied This Iteration

Section 3 required agents corrected from `copilot-engineer`/`prompt-engineer` (internal repo agents) to the actual distributable set: `code-reviewer`, `documentation-specialist`, `research-agent`, `security-specialist`. This raised the corrected baseline from 89→94. All subsequent iterations use the corrected rubric.

## Hypothesis

Add a prerequisite step in Section 8: if `.github/copilot-instructions.md` doesn't exist, create it from AGENTS.md before invoking `/sync-agents`. This unblocks sync, which stops early when that file is absent.

## Change Applied

`prompts/onboard-copilot.prompt.md` Section 8 — added "Prerequisite: ensure sync source exists" block with a `test -f .github/copilot-instructions.md || cp AGENTS.md .github/copilot-instructions.md` instruction.

## Score Delta by Section (corrected rubric)

| Section | Baseline | Iter 1 | Delta |
|---------|----------|--------|-------|
| 1 Codebase Analysis | 10 | 10 | 0 |
| 2 Coding Standards | 9 | 9 | 0 |
| 3 Agent Installation | 10 | 10 | 0 |
| 4 Agent Orchestration | 9 | 9 | 0 |
| 5 Docs Structure | 10 | 10 | 0 |
| 6 Initial ADR | 10 | 10 | 0 |
| 7 Security Baseline | 10 | 10 | 0 |
| 8 Sync | 6 | 5 | -1 |
| 9 Optional Baseline | 10 | 10 | 0 |
| 10 Summary Report | 10 | 4 | **-6** |
| **Total** | **94** | **87** | **-7** |

## Decision Rationale

Score decreased 94→87. Two regressions:

1. **Section 10 (-6)**: The documentation-specialist sub-agent was delegated to write the onboarding docs but failed mid-run (transcript: "✗ Read (Documentation-specialist agent (Draft onboarding docs)) — Failed"). No onboarding report was created.

2. **Section 8 (-1)**: Run timed out before reaching the sync step (Section 8 comes after Section 7). The hypothesis change was seen (model searched for `.github/copilot-instructions.md` at transcript line 186 and confirmed it was absent), but the run was killed before it could act on it.

The prompt change itself is directionally correct but couldn't be validated because the run stalled on sub-agent delegation. **The real failure this iteration was the documentation-specialist sub-agent failing**, not the prompt change.

**Revert per research loop rules**: any score decrease triggers revert regardless of cause.

## Sandbox & Process Issues Discovered

- The baseline run's outputs were committed to the repo, breaking the "clean sandbox" assumption for subsequent test runs. Going forward: manually remove the 5 baseline-added files before each iteration (`git restore --worktree` + manual rm of new files).
- The sandbox reset (`git checkout testing_sandbox/`) only restores tracked files to their committed state — it does NOT remove files added in the previous run if those were committed.

## Next Targets

**Primary**: Section 10 (4→10, +6 pts potential). The documentation-specialist sub-agent delegation is the bottleneck — when it fails, the onboarding report doesn't get written. Options:
1. Make the onboarding report creation inline (don't delegate) so it can't fail via sub-agent failure
2. Add an explicit fallback: "If @documentation-specialist is unavailable, write the onboarding report directly"

**Secondary**: Section 8 (5→10, +5 pts potential). Hypothesis 1's change is still valid — it just needs a working Section 10 run to reach Section 8.

**Stopping note**: Score at 87/100 is above 85 target but below corrected baseline (94). The regression was from sub-agent failure, not from the prompt quality. Next iteration should address Section 10 inline fallback.
