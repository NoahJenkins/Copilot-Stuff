---
date: 2026-03-12
topic: onboard-copilot sandbox fix pass 2
---

# OnboardCopilot Sandbox Fix Pass 2

## Summary

Second sandbox validation run revealed five recurring or new bugs in generated output. All five were fixed with targeted edits to `prompts/onboard-copilot.prompt.md`. The bugs fell into two categories: instructions that were too vague (agent found loopholes) and missing instructions (agent was never told not to do something).

## Findings

### Bug 1 — `docs/context/index.md` duplicate heading (recurring)

**Symptom**: Agent prepended a new `# docs/context/index.md` heading and `## Notes` block to the top of the file, leaving two competing `#` headings.

**Root cause**: Fix from pass 1 said "don't add a second `#` heading" — agent added a *first* heading as a new preamble instead. The instruction didn't say where to append.

**Fix**: Replaced with: read the file, find the last bullet entry, append below it. Explicitly prohibited prepending, new `#` headings, and new intro paragraphs.

### Bug 2 — ADR numbering conflict (recurring)

**Symptom**: `0001-adopt-copilot-agent-setup.md` created again even though `0001-adopt-documentation-structure.md` already existed.

**Root cause**: Guard said "check if `0001-*.md` exists" — agent ran the check but ignored the result and created `0001-` anyway. Instruction was advisory, not procedural.

**Fix**: Replaced with a procedural step: list all files in `docs/adr/`, identify all existing NNNN prefixes, use the next sequential number.

### Bug 3 — Security baseline deduplication (recurring)

**Symptom**: New (weaker, all-TODO) baseline created in `docs/researchReports/` even though `docs/context/2026-03-12-security-baseline.md` existed with real audit data.

**Root cause**: The deduplication check only blocked creation if the existing file was >90 days old. Agent treated the different directory as a different artifact and created anyway.

**Fix**: Changed check to: look in both `docs/context/` and `docs/researchReports/` for any `*security-baseline*` file. If found and it contains the required sections, skip creation entirely and reference the existing path.

### Bug 4 — Agent files have doubled frontmatter (new)

**Symptom**: Installed `code-reviewer.agent.md` and `research-agent.agent.md` each had two YAML frontmatter blocks — a minimal stub at top, then the full canonical content appended below.

**Root cause**: Agent created a stub file first (with just `name` + `onboarding-tags`), then downloaded the canonical file and appended it instead of replacing. Prompt never said not to do this.

**Fix**: Added explicit instruction under Download Requirements: write downloaded content directly in a single operation. Do not pre-create stub files. Each agent file must contain exactly one frontmatter block.

### Bug 5 — Expanded agents omitted from delegation list (new)

**Symptom**: Root `AGENTS.md` delegation line listed only the 4 core agents even though `@frontend-specialist` was installed.

**Root cause**: Section 4 said "ensure delegation index reflects all installed agents" but never told the agent to go back and edit `AGENTS.md` after install. The agent treated Section 4 as documentation, not an update step.

**Fix**: Added explicit instruction to Section 4: after confirming installed agents, update the Sub-Agent Delegation section in root `AGENTS.md` to include all expanded agents with their scope.

## Open Questions

- None. All five bugs had clear causes and targeted fixes.
