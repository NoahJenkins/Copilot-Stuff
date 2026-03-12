# Dependency Remediation Plan (`minimatch` / `ajv`)

## Summary
This plan tracks remediation for high/moderate transitive dependency vulnerabilities identified in the initial security baseline (`pnpm audit`). Findings are currently concentrated in linting/tooling transitive chains and should be addressed through controlled dependency upgrades and policy updates. The goal is to eliminate high-severity findings without destabilizing local developer workflows.

### Phase Status (Updated 2026-03-03)
- ✅ **Phase 1 completed**: compatibility matrix created and safe transitive override patch applied.
- ✅ Post-phase audit: 0 high / 0 moderate / 0 advisories.
- ✅ **Phase 2 completed**: Dependabot enabled, CI high/critical audit gate added, pnpm-only lockfile policy enforced.
- ✅ **Phase 3 completed (scoped)**: React patch modernization landed; ESLint 10 spike tested and rolled back due plugin incompatibility.
- ➡️ Remaining phases focus on optional direct dependency modernization batches and future ESLint 10 re-evaluation when ecosystem support stabilizes.

## Options/Findings

### Current Audit Snapshot (2026-03-02)
- High: 6
- Moderate: 1
- Critical: 0
- Primary affected packages (transitive):
  - `minimatch` (multiple ReDoS advisories in vulnerable ranges)
  - `ajv` (ReDoS in vulnerable range `<6.14.0`)

### Root-Cause Paths (from audit output)
- `eslint` transitive tree includes vulnerable `ajv` and legacy `minimatch` variants.
- `eslint-config-next` transitive tree includes vulnerable `minimatch` ranges in parser/import chains.

### Remediation Strategy
1. **Stabilize package-manager policy**
   - Standardize on pnpm lockfile as single source of truth to reduce drift and improve reproducibility.
2. **Upgrade direct tooling dependencies first**
   - Upgrade `eslint` and `eslint-config-next` to newest compatible releases for `next@16`.
   - Re-run `pnpm audit` after each tooling update batch.
3. **Constrain/override vulnerable transitive versions if needed**
   - Use `pnpm.overrides` in `package.json` for targeted `minimatch`/`ajv` transitive fixes when upstream lag exists.
4. **Automate ongoing patching**
   - Add Dependabot or Renovate configuration.
   - Add CI audit gate with severity threshold.

### Execution Plan
- Phase 1: Dependency inventory + compatibility matrix for `next`, `eslint`, and plugins.
- Phase 2: Incremental updates on a branch; validate with `pnpm lint` and `pnpm build`.
- Phase 3: Add overrides only for unresolved vulnerable transitive paths.
- Phase 4: Add automated update policy and monthly audit cadence.

### Success Criteria
- `pnpm audit` reports 0 critical and 0 high findings.
- Remaining moderate findings are documented with explicit accepted-risk rationale and target date.
- CI includes dependency/security scanning for pull requests.

## Open Questions
- Should high-severity transitive `devDependencies` findings block merge/release in this repo?
- Is the team comfortable enforcing pnpm-only lockfile policy immediately?
- Should audit gates fail on high-only, or high+moderate in CI?
