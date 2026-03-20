# Eval Report: onboard-copilot

- Date: 2026-03-20
- Transcript: docs/testingResults/2026-03-12-onboard-copilot-cli-output.txt
- Rubric: docs/eval-rubrics/onboard-copilot-rubric.md
- Sandbox: testing_sandbox/
- Infrastructure Track: **timeout**

> **Sandbox note:** The sandbox was reset (`git checkout testing_sandbox/`) after the March 12 run. Files created by the run (AGENTS.md, .vscode/extensions.json, .vscode/settings.json, docs/TODO.md edits) are no longer present. The security baseline (docs/context/2026-03-12-security-baseline.md) and docs structure survived because they were pre-committed. Scoring uses transcript evidence for reset files.

---

## Score Summary

| # | Section | Score | Notes |
|---|---------|-------|-------|
| 1 | Codebase Analysis | 7/10 | Stack confirmed in security baseline; analysis clearly precedes writes; AGENTS.md reset, can't verify stack reference |
| 2 | Coding Standards | 6/10 | Transcript confirms 59 lines (≤100 ✓); content/placeholder checks blocked by sandbox reset |
| 3 | Agent Installation | 6/10 | 2 of 4 required core agents present; prompt treated SHA-verified existing agents as "done" — never added copilot-engineer or prompt-engineer |
| 4 | Agent Orchestration | 4/10 | AGENTS.md was edited but content not visible in transcript; file reset; core agent omission suggests delegation map was incomplete |
| 5 | Docs Structure | 10/10 | All 4 dirs + TODO.md exist ✓ |
| 6 | Initial ADR | 10/10 | 0001 exists; all required sections present; no numbering conflict ✓ |
| 7 | Security Baseline | 10/10 | Rich, project-specific report in docs/context/; all required sections ✓ |
| 8 | Sync | 5/10 | N/A — run timed out before reaching sync step; no evidence of /sync-agents invocation |
| 9 | Optional Baseline | 10/10 | Path A — run timed out before optional steps; architecture/README.md pre-existed; no partial attempts |
|10 | Summary Report | 4/10 | Security baseline exists (4/4 ✓) but is not an onboarding summary; onboarding-report referenced in index.md was never created (run timed out) |
| | **Total** | **72/100** | |

**Infrastructure Track:** timeout (3504 bytes / 115 lines; run hit 300s bound; process force-killed; no `/exit` in transcript)

**Verdict: conditional-pass** — score 72/100 exceeds threshold (70); no section at 0; Sections 4 and 10 at 4/10 warrant targeted improvement.

---

## Mechanical Check Results

### Infrastructure
```
wc -c: 3504 bytes  (threshold: ≥100 ✓)
wc -l: 115 lines   (threshold: ≥5 ✓)
tail -20: ends mid-execution, no /exit indicator → timeout classification
```

### Section 1 — Codebase Analysis
```
grep -ic "next|typescript|tailwind|react" transcript → 0 (transcript uses action log format, not prose)
grep in security baseline → "Next.js 16 + React 19 + TypeScript 5.9 + Tailwind CSS 4" ✓
Transcript lines 1-61: all Explore/Check/Read operations
First write: line 88 (● Edit AGENTS.md) — analysis clearly precedes writes ✓
```

### Section 2 — Coding Standards
```
AGENTS.md: NOT PRESENT (sandbox reset; transcript confirms "AGENTS.md is 59 lines ✅")
TODO/PLACEHOLDER check: blocked by reset
```

### Section 3 — Agent Installation
```
Required: copilot-engineer, documentation-specialist, prompt-engineer, research-agent
Present:  documentation-specialist ✓, research-agent ✓
Missing:  copilot-engineer ✗, prompt-engineer ✗

wc -c .github/agents/*.agent.md:
  code-reviewer.agent.md:            2742 ✓
  documentation-specialist.agent.md: 2642 ✓
  frontend-specialist.agent.md:      2509 ✓
  research-agent.agent.md:           2304 ✓
  security-specialist.agent.md:      3109 ✓

Frontmatter (grep "^name:"): all 5 present agents pass ✓
```

### Section 4 — Orchestration
```
grep "delegat|orchestrat|handoff|specialist" AGENTS.md: AGENTS.md reset
Transcript: AGENTS.md edited (+48 -24); content not captured in transcript output
```

### Section 5 — Docs Structure
```
docs/adr/:            EXISTS ✓
docs/architecture/:   EXISTS ✓
docs/context/:        EXISTS ✓
docs/researchReports/:EXISTS ✓
docs/TODO.md:         EXISTS, non-empty ✓
```

### Section 6 — Initial ADR
```
docs/adr/0001-adopt-documentation-structure.md: EXISTS ✓
Sections: ## Status ✓  ## Context ✓  ## Options Considered ✓  ## Decision ✓  ## Consequences ✓
ADR count: 1 file, numbered 0001, no conflicts ✓
```

### Section 7 — Security Baseline
```
find docs -name "*security-baseline*":
  docs/context/2026-03-12-security-baseline.md ✓
  docs/context/2026-03-02-security-baseline.md (pre-existing)

grep -ic "depend|secret|auth|finding" 2026-03-12-security-baseline.md → 17 matches ✓

Sections: ## Summary, ## Critical Findings, ## Dependency Inventory,
          ## Detailed Findings, ## Recommendations, ## Open Questions ✓
```

### Section 8 — Sync
```
grep -ic "sync-agents|sync_agents" transcript → 0
CLAUDE.md: MISSING
.claude/CLAUDE.md: MISSING
→ N/A (timeout before sync step)
```

### Section 9 — Optional Baseline
```
docs/architecture/README.md: EXISTS (git log confirms pre-existing, added in initial commit)
No architecture content created during March 12 run
→ Path A: timeout before optional steps, no partial attempts → 10 pts
```

### Section 10 — Summary Report
```
ls docs/context/????-??-??-*.md:
  2026-03-02-codebase-analysis.md    (pre-existing)
  2026-03-02-dependency-remediation-plan.md (pre-existing)
  2026-03-02-onboarding-report.md    (pre-existing)
  2026-03-02-security-baseline.md    (pre-existing)
  2026-03-03-phase-2-automation-and-policy.md (pre-existing)
  2026-03-03-phase-3-modernization.md (pre-existing)
  2026-03-03-tooling-compatibility-matrix.md (pre-existing)
  2026-03-12-security-baseline.md    ← created by this run ✓

context/index.md references 2026-03-12-onboarding-report.md → FILE MISSING (run timed out before creation)
```

---

## Section Details

### Section 1 — Codebase Analysis: 7/10
- **4/4** Stack detected: security baseline explicitly names "DFW Cloud Devs website (Next.js 16 + React 19 + TypeScript 5.9 + Tailwind CSS 4)" — clearly project-specific analysis ran.
- **3/3** Analysis before writes: transcript lines 1–61 are exclusively Explore/Check/Read/Check operations. First write appears at line 88. Order is clean.
- **0/3** AGENTS.md stack reference: file was reset post-test; cannot verify. Partial credit withheld — can't award points for unverifiable content.

### Section 2 — Coding Standards: 6/10
- **4/4** Line count: transcript explicitly confirms "AGENTS.md is 59 lines ✅" — well under the 100-line limit.
- **1/3** No placeholders: transcript shows a substantive edit (+48 -24 from existing) suggesting real content, but file is reset and cannot be verified. 1 pt for plausible inference from transcript.
- **1/3** Content quality: transcript edit size (+48 lines) is consistent with real coding standards content, not stub text. But content cannot be read — 1 pt for inference.

### Section 3 — Agent Installation: 6/10
Critical finding: the prompt verified SHA hashes of 5 existing agents (code-reviewer, documentation-specialist, frontend-specialist, research-agent, security-specialist) and declared "no updates needed." It never checked whether copilot-engineer and prompt-engineer — required by the onboarding spec — were present. The result is 2 of 4 required core agents installed.
- **3/6** Core agent presence: 2 of 4 required agents present (documentation-specialist, research-agent). copilot-engineer and prompt-engineer absent.
- **2/2** No stubs: all present agents are ≥ 2304 bytes ✓
- **1/2** Frontmatter: required agents that are present have proper frontmatter; missing agents can't be verified. Partial credit.

### Section 4 — Agent Orchestration: 4/10
- **2/4** Delegation section: AGENTS.md was edited (+48 -24), suggesting real content was added. However, content is not visible in the transcript and the file was reset. Partial credit for evidence of effort.
- **0/3** All 4 agents listed: AGENTS.md reset; can't verify. Additionally, given Section 3 finding (copilot-engineer and prompt-engineer were never installed), the delegation map almost certainly didn't list all required agents.
- **2/3** Handoff protocol: existing AGENTS.md had some structure before the edit; partial credit for inherited structure.

### Section 5 — Docs Structure: 10/10
All four required directories and TODO.md exist and are non-empty. Full marks.

### Section 6 — Initial ADR: 10/10
ADR 0001 has all five sections (Status, Context, Options Considered, Decision, Consequences — exceeds the four required). Single file, sequential numbering, no conflicts. Full marks.

### Section 7 — Security Baseline: 10/10
The March 12 security baseline is comprehensive: project name, exact dependency count (431), zero vulnerabilities, lockfile confirmation, Dependabot status, pre-commit hooks, specific configuration issues (Prettier devDep, no CI gate, no test framework), and five concrete recommendations. Clearly derived from the actual sandbox, not generic advice. Full marks.

### Section 8 — Sync: 5/10 (N/A)
No `/sync-agents` invocation in transcript. No CLAUDE.md present. The run timed out during the docs/context update phase (last operation: editing context/index.md at line 114), well before the sync step that closes the onboarding workflow. N/A = 5 pts.

### Section 9 — Optional Baseline: 10/10 (Path A)
`docs/architecture/README.md` pre-dates the March 12 run (git history confirms initial commit). The run timed out before reaching optional onboarding steps, with no partial architecture-doc attempts visible in the transcript. Path A applies: 10 pts.

### Section 10 — Summary Report: 4/10
- **4/4** Context note with date prefix: `2026-03-12-security-baseline.md` exists ✓
- **0/3** Checklist of completed steps: the security baseline is a security audit report, not an onboarding summary. The context/index.md references `2026-03-12-onboarding-report.md` (which would be the summary), but that file was never created — the run timed out at line 115, just after editing the index, before writing the actual report body.
- **0/3** Checklist accuracy: N/A — no checklist exists.

---

## Lowest-Scoring Sections

1. **Section 4 — Agent Orchestration (4/10)** — AGENTS.md reset prevents content verification; core agent omission (Sections 3) means delegation map was incomplete regardless
2. **Section 10 — Summary Report (4/10)** — Run timed out before creating the onboarding-report context note; only a security baseline exists; index.md references a file that was never written
3. **Section 2 — Coding Standards (6/10)** — AGENTS.md reset blocks verification; line count confirmed via transcript but content quality unverifiable
4. **Section 3 — Agent Installation (6/10)** — Prompt confused "verify SHA of existing agents" with "install required core agents"; copilot-engineer and prompt-engineer never installed

---

## Improvement Targets

Two independent failure modes drive the lowest scores. **First**, the prompt's agent installation step needs an explicit check for the four required core agent names before verifying SHAs — the current logic exits early when existing agents match upstream, without confirming the required set is complete. Fixing this would directly improve Sections 3 and 4. **Second**, the onboarding summary report (Section 10) is created at the very end of the workflow, making it the first casualty of a timeout. Reordering so the summary is written incrementally (or as an early draft that is later expanded) would give Section 10 a non-zero score even in timeout runs. These two changes together address all four lowest-scoring sections without restructuring the prompt.
