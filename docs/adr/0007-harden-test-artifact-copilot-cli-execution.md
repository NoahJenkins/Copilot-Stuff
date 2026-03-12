# ADR 0007: Harden test-artifact Copilot CLI execution with dual modes and transcript safeguards

## Status
Accepted

## Context

The `test-artifact` skill defined a primarily manual Copilot CLI flow. In practice,
artifact tests can appear stuck when prompts are large, shell working directories drift,
or sessions are not explicitly exited. We needed a reliable execution pattern that keeps
the required in-session model selection behavior while improving reproducibility for
reports under `docs/testingResults/`.

## Options Considered

### Option 1: Keep manual-only interactive flow
**Pros:** Simple instructions.
**Cons:** Hard to automate, fragile transcript capture, and ambiguous stuck-session handling.

### Option 2: Use non-interactive `-p` mode only
**Pros:** Easy scripting and deterministic output capture.
**Cons:** Does not express the workflow requirement to set `/model` as the first in-session command.

### Option 3: Dual execution modes with scripted interactive pipe (Adopted)
**Pros:**
- Preserves first-command `/model` behavior
- Adds reproducible transcript capture for reports
- Adds explicit health checks and targeted process recovery
- Reduces cwd-related failures by standardizing repo-root resolution

**Cons:**
- Slightly longer instructions
- Requires shell familiarity for scripted mode

## Decision

Update `.github/skills/test-artifact/SKILL.md` to:

1. Define two execution modes:
   - Manual interactive mode
   - Scripted interactive mode (preferred for reproducible testing)
2. Standardize repo-root resolution before `cd testing_sandbox`.
3. Require transcript capture details (path + exact command) in reports.
4. Add stuck-session diagnostics and targeted Copilot CLI process recovery guidance.

## Consequences

### Positive
- Artifact tests are more repeatable and easier to debug.
- Reports include stronger evidence through deterministic transcript capture.
- Workflow remains compatible with the default model policy.

### Negative
- More command examples to maintain as CLI behavior evolves.