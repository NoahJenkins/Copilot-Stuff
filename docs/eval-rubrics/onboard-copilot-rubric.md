# Eval Rubric: onboard-copilot

**Total: 100 points (10 sections × 10 pts)**

**Overall pass threshold: 70/100 with no section at 0.**

---

## Two-Track Scoring

Before section scoring, classify the run:

| Track | Classification | Action |
|-------|---------------|--------|
| A | `clean` | All infrastructure gates passed; transcript ended with `/exit` output or normal termination | Score all sections normally |
| B | `timeout` | Run hit the runtime bound; process was force-killed | Score sections on evidence in partial transcript; mark incomplete sections N/A (5 pts each) |
| C | `infra-fail` | Transcript < 100 bytes or < 5 lines, or active Copilot process remained | Mark all sections N/A (5 pts each); report infrastructure reliability score only |

Infrastructure classification is always recorded before section scoring. A `timeout` does not zero sections that produced observable output.

---

## Section Scoring

### Section 1 — Codebase Analysis (10 pts)

**Goal:** Verify the prompt triggered real stack detection before any writing.

| Check | Points | Method |
|-------|--------|--------|
| Transcript or created files reference the detected stack (e.g., Next.js, TypeScript, Tailwind) | 4 | `grep -i "next\|typescript\|tailwind\|react" <transcript>` |
| Analysis language appears in transcript before first file-create operation | 3 | LLM: read transcript; confirm "analyze/detect/inspect" language precedes "create/write" language |
| `testing_sandbox/AGENTS.md` references stack or tech context | 3 | LLM: read file; check for stack-specific mentions |

**Score 0 if:** No stack detection language appears anywhere in transcript or created files.

---

### Section 2 — Coding Standards (10 pts)

**Goal:** Verify standards were extracted from the codebase, not invented.

| Check | Points | Method |
|-------|--------|--------|
| `testing_sandbox/AGENTS.md` line count ≤ 100 | 4 | `wc -l testing_sandbox/AGENTS.md` |
| No `[TODO]` or `[PLACEHOLDER]` literals in `AGENTS.md` | 3 | `grep -i "\[TODO\]\|\[PLACEHOLDER\]" testing_sandbox/AGENTS.md` → expect no match |
| Standards section references project-specific patterns (not generic boilerplate) | 3 | LLM: read Coding Standards section; assess whether rules are derived from the actual codebase vs. generic advice |

**Score 0 if:** `AGENTS.md` does not exist.

---

### Section 3 — Agent Installation (10 pts)

**Goal:** All four core agents installed; no empty stubs.

Core agents required (distributable set installed by onboard-copilot): `code-reviewer.agent.md`, `documentation-specialist.agent.md`, `research-agent.agent.md`, `security-specialist.agent.md`

Note: `copilot-engineer.agent.md` and `prompt-engineer.agent.md` are internal agents for working ON this repo — they are not part of the distributable set and should not be expected in target repos.

| Check | Points | Method |
|-------|--------|--------|
| All 4 core agent files exist in `testing_sandbox/.github/agents/` | 6 | `for a in code-reviewer documentation-specialist research-agent security-specialist; do test -f "testing_sandbox/.github/agents/${a}.agent.md" && echo FOUND || echo MISSING; done` |
| No agent file is a stub (each > 200 bytes) | 2 | `wc -c testing_sandbox/.github/agents/*.agent.md` — all must be > 200 |
| Agent files have required frontmatter (`name`, `description`, `model`) | 2 | `grep -l "^name:" testing_sandbox/.github/agents/*.agent.md` — all 4 must match |

**Score 0 if:** No agent files created in `testing_sandbox/.github/agents/`.

---

### Section 4 — Agent Orchestration (10 pts)

**Goal:** Delegation map is complete and handoff protocol is present.

| Check | Points | Method |
|-------|--------|--------|
| `testing_sandbox/AGENTS.md` contains a delegation/orchestration section | 4 | `grep -i "delegat\|orchestrat\|handoff\|specialist" testing_sandbox/AGENTS.md` |
| All 4 installed agents are listed in the delegation map | 3 | LLM: read delegation section; verify all 4 agent names appear |
| Handoff protocol section is present (describes when/how to switch agents) | 3 | LLM: read orchestration section; check for when-to-delegate criteria |

**Score 0 if:** No orchestration or delegation content in `AGENTS.md`.

---

### Section 5 — Docs Structure (10 pts)

**Goal:** All required docs directories and `TODO.md` were created.

| Check | Points | Method |
|-------|--------|--------|
| `testing_sandbox/docs/adr/` exists | 2 | `test -d testing_sandbox/docs/adr && echo exists` |
| `testing_sandbox/docs/architecture/` exists | 2 | `test -d testing_sandbox/docs/architecture && echo exists` |
| `testing_sandbox/docs/context/` exists | 2 | `test -d testing_sandbox/docs/context && echo exists` |
| `testing_sandbox/docs/researchReports/` exists | 2 | `test -d testing_sandbox/docs/researchReports && echo exists` |
| `testing_sandbox/docs/TODO.md` exists and is non-empty | 2 | `test -s testing_sandbox/docs/TODO.md && echo exists` |

**Score 0 if:** `testing_sandbox/docs/` does not exist at all.

---

### Section 6 — Initial ADR (10 pts)

**Goal:** A sequential ADR was created with required sections.

| Check | Points | Method |
|-------|--------|--------|
| At least one ADR file exists in `testing_sandbox/docs/adr/` with sequential numbering (e.g., `0001-*.md`) | 4 | `ls testing_sandbox/docs/adr/000*.md` |
| ADR contains required sections: Status, Context, Decision, Consequences | 4 | `grep -l "## Status\|## Context\|## Decision\|## Consequences" testing_sandbox/docs/adr/000*.md` |
| ADR number does not conflict with any existing ADR files | 2 | LLM: list all ADR files; verify numbering is sequential with no duplicates |

**Score 0 if:** No ADR files exist in `testing_sandbox/docs/adr/`.

---

### Section 7 — Security Baseline (10 pts)

**Goal:** Security baseline report was created with required content.

Expected location: `testing_sandbox/docs/researchReports/YYYY-MM-DD-security-baseline.md`
Acceptable fallback: `testing_sandbox/docs/context/YYYY-MM-DD-security-baseline.md`

| Check | Points | Method |
|-------|--------|--------|
| Security baseline file exists (in either location) | 4 | `find testing_sandbox/docs -name "*security-baseline*"` |
| File contains required sections (Dependencies/Packages, Secret Handling, Auth/Access, Findings) | 4 | `grep -i "depend\|secret\|auth\|finding" <baseline-file>` |
| File references the actual sandbox project (not generic advice) | 2 | LLM: read file; verify at least one sandbox-specific detail (package name, file path, etc.) |

**Score 0 if:** No security baseline file found.

---

### Section 8 — Sync (10 pts)

**Goal:** `/sync-agents` ran and `CLAUDE.md` or equivalent was updated.

| Check | Points | Method |
|-------|--------|--------|
| Transcript contains `/sync-agents` invocation | 5 | `grep -i "sync-agents\|sync_agents" <transcript>` |
| `testing_sandbox/CLAUDE.md` exists (or `testing_sandbox/.claude/CLAUDE.md`) | 3 | `test -f testing_sandbox/CLAUDE.md` |
| Sync output in transcript shows completion (no error lines after sync invocation) | 2 | LLM: read transcript section around sync invocation; check for error indicators |

**Score 0 if:** Transcript shows `/sync-agents` was explicitly skipped or not attempted.
**N/A (5 pts) if:** Run timed out before reaching sync step.

---

### Section 9 — Optional Baseline (10 pts)

**Goal:** Optional onboarding steps were handled correctly (either properly skipped or correctly created).

This section uses conditional scoring:

**Path A — Steps were skipped (award full 10 pts if):**
- Transcript shows a deliberate skip decision for optional steps, OR
- Transcript ended (timeout/clean) before optional steps without partial attempts

**Path B — Steps were attempted (score on quality):**

| Check | Points | Method |
|-------|--------|--------|
| Architecture diagram or initial architecture doc created | 5 | `find testing_sandbox/docs/architecture -name "*.md" -size +0c` |
| Tech stack summary or README update present | 5 | `grep -i "stack\|technology\|tech" testing_sandbox/docs/architecture/*.md` |

Award 10 pts for a clean skip. Award partial points for an attempted but incomplete optional step only if the attempt produced non-empty files.

---

### Section 10 — Summary Report (10 pts)

**Goal:** A dated context note exists and accurately reflects what was created.

| Check | Points | Method |
|-------|--------|--------|
| Context note exists in `testing_sandbox/docs/context/` with date prefix | 4 | `ls testing_sandbox/docs/context/????-??-??-*.md` |
| Context note contains a checklist or summary of completed steps | 3 | `grep -i "- \[x\]\|✓\|complete\|created\|installed" <context-note>` |
| Checklist reflects actual files created (no false positives) | 3 | LLM: compare checklist items to actual filesystem state; penalize checked items for non-existent files |

**Score 0 if:** No context note or summary report created.

---

## Scoring Notes

- **Mechanical checks** (file existence, line count, grep): score immediately from bash output.
- **LLM checks**: read the relevant file section and assess against the criterion. Be conservative — award points only when the criterion is clearly met.
- **N/A sections** (infrastructure track C, or timeout track B for incomplete sections): award 5 pts per N/A section to reflect infrastructure uncertainty rather than artifact failure.
- **Section at 0** with overall score ≥ 70: report as "conditional pass — section X needs investigation."

---

## Score Report Format

```
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

Infrastructure Track: clean | timeout | infra-fail

**Verdict:** pass | conditional-pass | fail

## Lowest-Scoring Sections
1. Section X (Y/10) — <one-line reason>
2. Section X (Y/10) — <one-line reason>
3. Section X (Y/10) — <one-line reason>
```
