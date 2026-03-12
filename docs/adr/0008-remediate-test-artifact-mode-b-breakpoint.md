# ADR 0008: Remediate test-artifact Mode B breakpoint with input-file transport and infrastructure gates

## Status
Accepted

## Context

The `test-artifact` scripted interactive Mode B flow used a pipe-based stdin pattern to drive `copilot`:

```bash
{ ... } | copilot --allow-all-tools --output-format text > "$OUT" 2>&1
```

In long-running prompt tests, this pattern proved unreliable for clean termination and repeatability. We observed sessions that produced partial output and then required manual process cleanup. We also observed command-safety blocks for some generated shell patterns, which made completion status ambiguous unless infrastructure checks were explicit.

## Options Considered

### Option 1: Keep existing pipe-based Mode B and rely on manual cleanup
Pros: No workflow changes.
Cons: Inconsistent termination, weak repeatability, ambiguous pass/fail boundaries.

### Option 2: Remove Mode B and use manual-only testing
Pros: Simpler instructions.
Cons: Lower reproducibility and weaker transcript evidence for reports.

### Option 3: Keep Mode B but harden execution and classification (Adopted)
Pros:
- Better reliability with input-file stdin transport
- Bounded runtime with timeout support
- Explicit infrastructure gates and retry policy
- Clear fallback path to manual Mode A
- Cleaner artifact-quality vs infrastructure-failure classification
Cons:
- Slightly more complex commands and report requirements

## Decision

Update `.github/skills/test-artifact/SKILL.md` to:

1. Use input-file redirection for Mode B scripted input.
2. Apply optional timeout bounds when `gtimeout`/`timeout` is available.
3. Enforce infrastructure gates:
   - minimum transcript bytes
   - minimum transcript lines
   - no active Copilot CLI process after run
4. Retry Mode B up to 3 times with backoff when gates fail.
5. Fall back to Mode A after repeated Mode B infrastructure failures.
6. Classify repeated gate failures as infrastructure reliability issues unless artifact behavior was fully observed.

## Consequences

### Positive
- More deterministic transcript capture.
- Faster detection of hung/stalled runs.
- Cleaner test verdict semantics.

### Negative
- Additional execution logic to maintain as CLI behavior evolves.
- Timeout behavior may vary by host environment when timeout binaries are unavailable.
