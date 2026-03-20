# Eval Report: onboard-copilot (Baseline)

- Date: 2026-03-20
- Transcript: docs/testingResults/2026-03-20-onboard-copilot-baseline-cli-output.txt
- Rubric: docs/eval-rubrics/onboard-copilot-rubric.md
- Sandbox: testing_sandbox/
- Infrastructure Track: **clean**

> This is the official Iteration 0 baseline for the research loop. The sandbox was freshly reset before this run. The run completed within the 300s limit (session time: 3m 49s), exited cleanly, and left no stale processes.

---

## Score Summary

| # | Section | Score | Notes |
|---|---------|-------|-------|
| 1 | Codebase Analysis | 10/10 | Stack fully detected; analysis clearly precedes all writes |
| 2 | Coding Standards | 9/10 | 63 lines ✓; no [TODO] brackets ✓; testing section has `# TODO` placeholders (unfilled, appropriate given no framework installed) |
| 3 | Agent Installation | 6/10 | 2 of 4 required core agents present; copilot-engineer and prompt-engineer never installed — prompt conflated "verify existing agents" with "install required set" |
| 4 | Agent Orchestration | 8/10 | Delegation map present with 5 agents; installed core agents (documentation-specialist, research-agent) listed; per-agent when-to-use criteria present |
| 5 | Docs Structure | 10/10 | All 4 dirs + TODO.md ✓ |
| 6 | Initial ADR | 10/10 | 0002 created sequentially after existing 0001; all required sections ✓ |
| 7 | Security Baseline | 10/10 | Created in correct location (researchReports/); all sections; project-specific throughout |
| 8 | Sync | 6/10 | `/sync-agents` invoked ✓; correctly stopped — no copilot-instructions.md source; CLAUDE.md not created |
| 9 | Optional Baseline | 10/10 | Path A — run completed cleanly; optional steps appropriately handled or skipped |
|10 | Summary Report | 10/10 | Comprehensive onboarding report with [x] checklist; all checked items verified in filesystem |
| | **Total** | **89/100** | |

**Infrastructure Track:** clean (6438 bytes / 153 lines; session time 3m 49s; clean exit; no remaining processes)

**Verdict: pass** — 89/100, no section below 6.

---

## Mechanical Check Results

### Infrastructure
```
wc -c: 6438 bytes  (threshold: ≥100 ✓)
wc -l: 153 lines   (threshold: ≥5 ✓)
tail: "Total session time: 3m 49s" — clean exit ✓
no copilot CLI processes ✓
```

### Section 1 — Codebase Analysis
```
Transcript lines 1–62: Explore, Read package.json, Read eslint/tsconfig,
  Read AGENTS.md/TODO/ADRs, Read source files (Hero.tsx, utils.ts, page.tsx,
  constants.ts, layout.tsx, providers.tsx), Check agents, Check .gitignore, Check context/index.md
First write: line 69 (● Create docs/AGENTS.md) — analysis clearly precedes writes ✓

AGENTS.md line 4–9:
  Language: TypeScript 5 (strict mode)
  Framework: Next.js 16 App Router, React 19
  Styling: Tailwind CSS 4 with cn() utility (clsx + tailwind-merge)
  → stack explicitly referenced ✓
```

### Section 2 — Coding Standards
```
wc -l AGENTS.md → 63 lines (≤100 ✓)
grep -ic "\[TODO\]\|\[PLACEHOLDER\]" AGENTS.md → 0 matches ✓
# TODO markers present (different format): 3 lines in Testing section — no test framework installed
```

### Section 3 — Agent Installation
```
Required: copilot-engineer, documentation-specialist, prompt-engineer, research-agent
Present:  documentation-specialist ✓, research-agent ✓
Missing:  copilot-engineer ✗, prompt-engineer ✗

All present agents > 2000 bytes ✓
Frontmatter (name:) on all present agents ✓

Transcript line 84: "All 5 agents match canonical SHAs exactly — no updates needed."
→ Prompt verified SHA of 5 existing agents but never checked for missing required agents
```

### Section 4 — Orchestration
```
grep -ic "delegat|orchestrat|handoff|specialist" AGENTS.md → 4 matches ✓

## Sub-Agent Delegation in AGENTS.md:
  @research-agent — technical research, dependency lookups, codebase analysis ✓
  @code-reviewer — code quality, standards adherence, maintainability ✓
  @security-specialist — vulnerability analysis, dependency audits, secure coding review ✓
  @documentation-specialist — ADRs, architecture docs, context and research notes ✓
  @frontend-specialist — frontend architecture, component design, Tailwind/Next.js patterns ✓
```

### Section 5 — Docs Structure
```
docs/adr/:            EXISTS ✓
docs/architecture/:   EXISTS ✓
docs/context/:        EXISTS ✓
docs/researchReports/:EXISTS ✓  (new — created during this run)
docs/TODO.md:         EXISTS, non-empty ✓
```

### Section 6 — Initial ADR
```
docs/adr/0001-adopt-documentation-structure.md  (pre-existing)
docs/adr/0002-adopt-copilot-agent-setup.md      (created this run)
Sections in 0002: ## Status ✓  ## Context ✓  ## Options Considered ✓  ## Decision ✓  ## Consequences ✓
Sequential numbering with no gaps or conflicts ✓
```

### Section 7 — Security Baseline
```
find docs -name "*security-baseline*":
  docs/researchReports/2026-03-20-security-baseline.md  ← created this run, correct location ✓
  docs/context/2026-03-12-security-baseline.md           (pre-existing)
  docs/context/2026-03-02-security-baseline.md           (pre-existing)

grep -ic "depend|secret|auth|finding": matches across all required sections ✓
Project-specific: "DFW Cloud Devs website (Next.js 16 + React 19 + TypeScript 5.9 + Tailwind CSS 4)",
  "431 dependencies", "pnpm-lock.yaml", "dependabot.yml", pnpm.overrides listed ✓
References prior baseline: "Previous security baseline: docs/context/2026-03-12-security-baseline.md" ✓
```

### Section 8 — Sync
```
grep "sync-agents" transcript:
  Line 96: "Now run `/sync-agents` to propagate to all AI tools:"
  Line 98: "● skill(sync-agents)"  ← invoked ✓
  Line 113: "The `/sync-agents` skill requires `.github/copilot-instructions.md` as its
             source of truth, which doesn't exist in this repo. Stopping sync per skill rules."

CLAUDE.md: MISSING ✗
```

### Section 9 — Optional Baseline
```
Onboarding report Optional Baseline section:
  [x] .gitignore — existing ✓
  [x] .vscode/ — existing ✓
  [x] .github/ISSUE_TEMPLATE/ — existing ✓
  [x] .github/PULL_REQUEST_TEMPLATE.md — existing ✓
  [x] .pre-commit-config.yaml — existing ✓
  [ ] .env.example — no .env file detected; skipped ✓
  [ ] docs/architecture/ci-cd-pipeline.md — no CI workflows; skipped ✓
→ Path A: clean run, optional steps appropriately handled
```

### Section 10 — Summary Report
```
docs/context/2026-03-20-onboarding-report.md: EXISTS ✓ (90 lines)
Contains [x] checklist in "Files Created / Modified" ✓
git status confirms all checked items present in filesystem ✓
No false positives: sync noted as ⚠️ (not checked [x]) ✓
```

---

## Section Details

### Section 1 — Codebase Analysis: 10/10
- **4/4** Stack detection: AGENTS.md §Project Overview explicitly lists TypeScript 5 (strict), Next.js 16 App Router, React 19, Tailwind CSS 4, framer-motion, pnpm 10 — clearly derived from package.json and source files read during analysis.
- **3/3** Analysis before writes: The first 62 lines of the transcript are exclusively reads and explorations (package.json, eslint config, tsconfig, source files, agents, .gitignore, context index). First write is line 69.
- **3/3** AGENTS.md stack reference: Project Overview section is the first content block; names exact versions throughout.

### Section 2 — Coding Standards: 9/10
- **4/4** 63 lines — well under the 100-line limit, and the transcript verified this explicitly.
- **3/3** No `[TODO]` or `[PLACEHOLDER]` brackets — grep returns 0.
- **2/3** Content quality: Coding standards (naming conventions, file conventions, `'use client'` directive, default vs named exports, async/await preference) are clearly derived from the actual source files read (Hero.tsx, utils.ts, constants.ts, providers.tsx). One point deducted: the testing section consists entirely of `# TODO` placeholders. While appropriate for a repo without a test framework, it provides no actionable guidance.

### Section 3 — Agent Installation: 6/10
The central failure of this run. The prompt checked `onboarding-tags` on the 5 existing agents and found all 5 present. It then fetched canonical agent SHAs (line 72) and verified all 5 matched (line 84: "All 5 agents match canonical SHAs exactly — no updates needed"). It never checked whether `copilot-engineer.agent.md` and `prompt-engineer.agent.md` — which are required core agents per the rubric — were present. The SHA verification loop exits on "all match" without first asserting the required set is complete.
- **3/6** 2 of 4 required core agents present (documentation-specialist, research-agent).
- **2/2** All present agents are non-stubs (>2000 bytes each).
- **1/2** Frontmatter: present agents have proper frontmatter; missing agents cannot be verified.

### Section 4 — Agent Orchestration: 8/10
AGENTS.md has a `## Sub-Agent Delegation` section listing all 5 installed agents with one-line when-to-use descriptions. This is a legitimate delegation map, well-structured.
- **4/4** Delegation section exists and grep matches confirm it.
- **2/3** All 4 installed agents listed: The 2 required core agents that are installed (documentation-specialist, research-agent) are listed. The other 3 listed (code-reviewer, security-specialist, frontend-specialist) are bonus agents. The 2 missing required agents (copilot-engineer, prompt-engineer) are absent from both the filesystem and the map — consistent, but incomplete.
- **2/3** Handoff criteria: Each agent has a one-line description of its domain, serving as when-to-delegate guidance. The `docs/AGENTS.md` file (47 lines) provides the full handoff protocol. Partial deduction: root `AGENTS.md` doesn't explicitly say "if you need X, use @Y" as a decision tree — only "see `.github/agents/` for full agent definitions."

### Section 5 — Docs Structure: 10/10
All four directories and TODO.md exist. `docs/researchReports/` was newly created this run (confirmed in git status as untracked). Full marks.

### Section 6 — Initial ADR: 10/10
The prompt correctly read `docs/adr/` before creating a new ADR, identified 0001 as existing, and created 0002 as the next sequential entry. ADR 0002 contains all five sections (Status, Context, Options Considered, Decision, Consequences) and is substantive — three options evaluated, consequences split into Positive/Negative/Mitigation. Full marks.

### Section 7 — Security Baseline: 10/10
- Created in `docs/researchReports/` (the correct primary location per rubric) rather than `docs/context/`.
- References the prior baselines (2026-03-12, 2026-03-02) — correctly identifies deduplication.
- Includes the resolved pnpm.overrides from the 2026-03-02 remediation — context-aware, not a generic rerun.
- Specific pnpm audit output quoted inline. Full marks.

### Section 8 — Sync: 6/10
`/sync-agents` was invoked (line 98) and ran. It correctly diagnosed that `.github/copilot-instructions.md` doesn't exist and stopped per skill rules — this is correct behavior, not an error. However, the consequence is that CLAUDE.md was never created, so other AI tools (Claude Code, Cursor, etc.) don't have the new AGENTS.md content propagated.
- **5/5** Sync invoked.
- **0/3** CLAUDE.md absent.
- **1/2** Sync output: correctly applied skill rules; not a silent failure. The ⚠️ note in the summary report informs the user what to do next.

### Section 9 — Optional Baseline: 10/10
Path A. The run completed cleanly (not a timeout). Optional baseline items were either verified as existing (`.vscode/`, `.github/ISSUE_TEMPLATE/`) or correctly skipped with rationale (`.env.example` skipped — no `.env` present; CI docs skipped — no workflows). No false attempts. Full marks.

### Section 10 — Summary Report: 10/10
`docs/context/2026-03-20-onboarding-report.md` is comprehensive: executive summary, technologies detected, complete `[x]` file checklist, agent list with roles, recommended next steps (immediate / this week / ongoing), and skipped sections with rationale. All checked items are confirmed present in the filesystem. The sync issue is correctly marked ⚠️ rather than `[x]`. Full marks.

---

## Lowest-Scoring Sections

1. **Section 3 — Agent Installation (6/10)** — copilot-engineer and prompt-engineer never installed; SHA verification loop exits on "all match" without checking required agent presence first
2. **Section 8 — Sync (6/10)** — /sync-agents correctly diagnosed missing copilot-instructions.md and stopped; CLAUDE.md not created; sync did not complete
3. **Section 2 — Coding Standards (9/10)** — testing section consists entirely of `# TODO` placeholders; minor deduction for partial guidance

---

## Research Loop Status

**Baseline established: 89/100**

Per research-loop stopping criteria: **score ≥ 85 → target reached.**

The baseline run exceeds the stopping threshold. The two lowest sections (3 and 8, both at 6/10) reflect genuine prompt behaviors:

- **Section 3** is a correctness bug: the prompt should verify required agent names before running SHA checks. A one-iteration fix is well-scoped.
- **Section 8** is a prerequisite gap: `copilot-instructions.md` doesn't exist in the sandbox, so `/sync-agents` cannot propagate. This could be addressed by having the prompt create `copilot-instructions.md` as part of onboarding (writing AGENTS.md content there) before invoking sync.

Whether to continue iterating beyond 89 is a human judgment call — the rubric target is met, but both low-scoring sections have clear, testable fixes.
