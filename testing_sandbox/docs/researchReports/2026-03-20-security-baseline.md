# Security Baseline Report

*Generated: 2026-03-20*

## Summary

The DFW Cloud Devs website (Next.js 16 + React 19 + TypeScript 5.9 + Tailwind CSS 4) has a clean security posture as of this assessment. The most recent `pnpm audit` (2026-03-12) reported **0 vulnerabilities** across 431 dependencies. Pre-commit secret detection hooks and a comprehensive `.gitignore` are in place. The primary outstanding risk remains the absence of a CI/CD pipeline to enforce ongoing audit checks automatically.

## Critical Findings

None. No critical or high-severity vulnerabilities found.

## Dependency Inventory

- Total dependencies: **431** (as of 2026-03-12 audit)
- Dependencies with known vulnerabilities: **0**
- Outdated dependencies (>1 year): Unknown — no automated staleness check configured
- Lockfile: `pnpm-lock.yaml` present (reproducible builds enforced)
- Automated updates: `dependabot.yml` configured for npm ecosystem

## Detailed Findings

### Known Vulnerabilities

```
pnpm audit output (2026-03-12):
  vulnerabilities: { info: 0, low: 0, moderate: 0, high: 0, critical: 0 }
  totalDependencies: 431
```

Transitive vulnerabilities from prior audit (2026-03-02) were resolved via targeted `pnpm.overrides` in `package.json`:
- `ajv@6.12.6` → `6.14.0`
- `minimatch@3.1.2` → `3.1.4`
- `minimatch@9.0.5` → `9.0.7`

### Configuration Issues

- **No CI/CD audit gate**: Audit is not enforced on PRs. A failing `pnpm audit` on a dependency update would not block merge.
- **ESLint 10 adoption pending**: Held back on ESLint 10 upgrade pending plugin ecosystem compatibility (tracked in `docs/TODO.md`).

### Secrets & Credentials

- `.env*` files are covered by `.gitignore` — no secrets files will be committed
- `pre-commit` hooks include detect-secrets (via `.pre-commit-config.yaml`)
- Environment variables follow `NEXT_PUBLIC_*` convention for client-side values
- No hardcoded secrets detected in source files

## Recommendations

1. **Add CI audit gate** — Run `pnpm audit --audit-level=moderate` in a GitHub Actions workflow on PRs to block dependency vulnerabilities from merging
2. **Add automated staleness check** — Use `pnpm outdated` in CI or enable Dependabot version updates
3. **Add Vitest or Jest** — No test framework is currently installed; add one to enable security-relevant unit tests
4. **Monthly audit runs** — Run `pnpm audit` locally until CI gate is in place

## Open Questions

- Should the CI audit gate fail on `moderate` or only `high`/`critical` severity?
- When will the testing framework be selected and added?

## References

- Previous security baseline: `docs/context/2026-03-12-security-baseline.md`
- Dependency remediation plan: `docs/context/2026-03-02-dependency-remediation-plan.md`
- Dependabot config: `.github/dependabot.yml`
