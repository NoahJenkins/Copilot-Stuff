---
name: test-artifact
description: 'Test distributable Copilot artifacts (agents, prompts, instructions, skills) against the testing_sandbox workspace. Use when you want to validate real behavior, collect actionable feedback, and publish dated results in docs/testingResults/.'
---

# Test Artifact in Sandbox

Use this workflow to test artifacts from this repository against `testing_sandbox/`.

## Prerequisites

- GitHub Copilot CLI: `copilot` must be available in your PATH
- Authenticated with GitHub Copilot

## Default Model

Use **`gpt-5-mini`** for all test executions unless the user specifies a different model.
After launching `copilot`, set the model by running `/model gpt-5-mini` as the first command in the session.

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

### 2) Validate Artifact Format

Before installing, verify the artifact's frontmatter meets the format rules for its type:

- **`.instructions.md` files** — must have both `description` and `applyTo` fields. If either is missing, stop and report the missing field(s) before proceeding.
- **`.agent.md` files** — must have `name`, `description`, and `model` fields.
- **`SKILL.md` files** — must have `name` and `description` fields; `name` must exactly match the parent directory name.
- **`.prompt.md` files** — must have a `description` field; `model` is strongly recommended.

If any required field is missing, fail the test at this step and include the validation error in the feedback report.

### 3) Prepare Sandbox Install Target

- Install/copy the artifact into sandbox-compatible paths as needed.
- For `.instructions.md` testing, install into `testing_sandbox/.github/instructions/`.
- For agent testing, install into `testing_sandbox/.github/agents/`.
- For skill testing, install into `testing_sandbox/.github/skills/<name>/SKILL.md`.

### 4) Execute Artifact Intent

Use the `copilot` CLI to exercise the artifact. Run from the `testing_sandbox/` directory so
the sandbox codebase is available as context.

**General invocation pattern:**

```bash
cd testing_sandbox
copilot
```

Once inside the Copilot session, set the model first:

```
/model gpt-5-mini
```

Then submit the task description:

```
<describe the task the artifact is meant to handle>
```

**By artifact type:**

- **Prompts** — Paste the prompt content as the input. Compare output against intended behavior.
- **Agents** — Describe the agent's role and a representative task; pass as the input.
- **Instructions / Skills** — First install the artifact into the sandbox (Step 3), then invoke a task that the instruction is meant to shape. Check that output reflects the instruction constraints.

**Overriding the model:**

Use `/model <model-name>` within the Copilot session before submitting the task.

Capture the session output verbatim for inclusion in the feedback report (Step 6).

- Verify the captured behavior against the success criteria from Step 1.

### 5) Evaluate Quality

Assess:

- Correctness against intended purpose
- Instruction fidelity (did the agent follow constraints?)
- Practicality and maintainability of resulting changes
- Safety and policy alignment

### 6) Publish Feedback Report

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