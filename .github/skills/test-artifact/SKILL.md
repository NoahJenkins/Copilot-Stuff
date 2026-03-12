---
name: test-artifact
description: 'Test distributable Copilot artifacts (agents, prompts, instructions, skills) against the testing_sandbox workspace. Use when you want to validate real behavior, collect actionable feedback, and publish dated results in docs/testingResults/.'
---

# Test Artifact in Sandbox

Use this workflow to test artifacts from this repository against `testing_sandbox/`.

## Scope

- Artifacts under test may come from `agents/`, `prompts/`, `skills/`, or `instructions/`.
- Sandbox target is `testing_sandbox/` (Next.js app with TypeScript, Tailwind, and docs structure).
- Output reports are written to `docs/testingResults/` at the repository root.

## Mutation Policy

- You may modify sandbox agent-configuration files:
  - `testing_sandbox/AGENTS.md`
  - `testing_sandbox/CLAUDE.md`
  - `testing_sandbox/.github/**`
  - `testing_sandbox/.claude/**`
- Treat application/runtime files as read-only by default:
  - `testing_sandbox/app/**`
  - `testing_sandbox/public/**`
  - `testing_sandbox/package.json`
  - `testing_sandbox/tsconfig.json`
- Only modify application/runtime files when the artifact being tested explicitly requires it.

## Workflow

### 1) Select Artifact and Success Criteria

- Identify the artifact and its intended behavior.
- Define concrete pass/fail checks before running the test.

### 2) Prepare Sandbox Install Target

- Install/copy the artifact into sandbox-compatible paths as needed.
- For `.instructions.md` testing, install into `testing_sandbox/.github/instructions/`.
- For agent testing, install into `testing_sandbox/.github/agents/`.
- For skill testing, install into `testing_sandbox/.github/skills/<name>/SKILL.md`.

### 3) Execute Artifact Intent

- Run the artifact in the sandbox context.
- Capture key outputs, behavior changes, and any failures.
- Verify the artifact behavior against the success criteria from Step 1.

### 4) Evaluate Quality

Assess:

- Correctness against intended purpose
- Instruction fidelity (did the agent follow constraints?)
- Practicality and maintainability of resulting changes
- Safety and policy alignment

### 5) Publish Feedback Report

Create `docs/testingResults/YYYY-MM-DD-<artifact-name>.md` with:

- Artifact under test
- Date
- Sandbox setup performed
- Test actions executed
- Observed behavior
- Pass/fail verdict
- Recommended improvements

## Report Template

```markdown
# <artifact-name> test results

- Date: YYYY-MM-DD
- Artifact: <path>
- Sandbox target: testing_sandbox/

## Setup
<what was installed or configured>

## Test Actions
<what was executed>

## Observed Behavior
<actual outputs and behavior>

## Verdict
- Pass/Fail: <pass|fail|partial>
- Rationale: <why>

## Recommended Improvements
1. <improvement>
2. <improvement>
```

## Optional Cleanup

- If you modified sandbox files during testing, you may reset sandbox changes with:

```bash
git checkout testing_sandbox/
```