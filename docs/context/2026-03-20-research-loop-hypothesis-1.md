# Research Loop Hypothesis 1

- Date: 2026-03-20
- Iteration: 1
- Target Section: Section 8 — Sync
- Prior Score: 89/100 (baseline; 94/100 with corrected Section 3 rubric)

## Rubric Correction (pre-iteration)

Before applying any prompt change, the Section 3 required agent set in the rubric was wrong. It listed `copilot-engineer` and `prompt-engineer` — internal agents for working on this repo — instead of the actual distributable core agents installed by onboard-copilot: `code-reviewer`, `documentation-specialist`, `research-agent`, `security-specialist`.

With the corrected rubric, the baseline Section 3 score is 10/10 (all 4 distributable core agents were present and SHA-verified in the sandbox). Section 4 similarly improves — the delegation map listed all installed agents. Corrected baseline: ~94/100.

## Hypothesis

`/sync-agents` requires `.github/copilot-instructions.md` as its source of truth and stops immediately if that file doesn't exist. Since `onboard-copilot` creates `AGENTS.md` but not `copilot-instructions.md`, sync never completes and `CLAUDE.md` is never written.

**Fix**: In Section 8 of the prompt, add a prerequisite step — if `.github/copilot-instructions.md` doesn't exist, create it by copying the AGENTS.md content before invoking `/sync-agents`. This unblocks sync and allows CLAUDE.md (and other tool configs) to be written.

## Change Applied

`prompts/onboard-copilot.prompt.md` — Section 8 (Sync to All AI Tools)

Added a "Prerequisites" block before the `/sync-agents` invocation instructing the agent to:
1. Check if `.github/copilot-instructions.md` exists
2. If not, create it by copying root `AGENTS.md` content
3. Then invoke `/sync-agents`

## Expected Effect

- `/sync-agents` completes fully instead of stopping at the missing-file check
- `CLAUDE.md` is written to the sandbox root
- Section 8: 5/10 (invoked) + 3/10 (CLAUDE.md present) + 2/10 (clean completion) = 10/10
- Net gain: +4 pts on Section 8
- Total: ~94 → ~98/100 (with corrected rubric)
