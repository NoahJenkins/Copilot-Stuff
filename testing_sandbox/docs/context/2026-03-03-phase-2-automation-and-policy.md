# Phase 2 Execution: Automation and Lockfile Policy

## Summary
Phase 2 was executed to operationalize dependency risk controls: automated dependency update PRs, CI vulnerability gating, and pnpm-only lockfile policy enforcement. This phase builds on the Phase 1 remediation patch and converts it into ongoing guardrails.

## Options/Findings

### Implemented Controls
- Added Dependabot configuration at `.github/dependabot.yml`:
  - Weekly npm ecosystem checks.
  - PR labeling for dependencies/security.
  - Major version auto-update ignored for `next`, `react`, and `react-dom`.
- Added CI gate at `.github/workflows/dependency-audit.yml`:
  - Runs on PR, push to `main`, and weekly schedule.
  - Enforces pnpm-only policy by failing if `package-lock.json` exists.
  - Installs via pnpm and fails on high/critical audit findings.
- Lockfile policy cleanup:
  - Removed `package-lock.json`.
  - Added `.npmrc` with `package-manager-strict=true`.

### Build/Tooling Stability
- Updated `next.config.ts` with explicit `turbopack.root` using config-file-relative project path resolution (via `import.meta.url`) to prevent root inference ambiguity regardless launch directory.

### Validation Expectations
- `pnpm lint` should remain green.
- `pnpm build` should remain green and avoid previous root-inference warning.
- `pnpm audit --json` should continue to report zero high/critical findings.

## Open Questions
- Should CI gate threshold be tightened to fail on moderate findings as well?
- Should Dependabot PR cadence remain weekly or move to daily for faster patch intake?
- Should additional CI checks include a secrets scanner in the same workflow or dedicated workflow?
