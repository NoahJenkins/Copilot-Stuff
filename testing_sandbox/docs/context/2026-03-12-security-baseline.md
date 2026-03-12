# Security Baseline Report

*Generated: 2026-03-12*

## Summary

The DFW Cloud Devs website (Next.js 16 + React 19 + TypeScript 5.9 + Tailwind CSS 4) has a clean security posture as of this assessment. `pnpm audit` reported **0 vulnerabilities** across all 431 dependencies. Secret detection hooks are in place via pre-commit, and the `.gitignore` is comprehensive. The primary outstanding risk is the absence of a CI/CD pipeline to enforce ongoing audit checks automatically.

## Critical Findings

None. No critical or high-severity vulnerabilities found.

## Dependency Inventory

- Total dependencies: **431**
- Dependencies with known vulnerabilities: **0**
- Outdated dependencies (>1 year): Unknown — no automated staleness check configured yet
- Lockfile: `pnpm-lock.yaml` present (reproducible builds enforced)
- Automated updates: `dependabot.yml` configured for npm ecosystem

## Detailed Findings

### Known Vulnerabilities

```
pnpm audit output (2026-03-12):
  vulnerabilities: { info: 0, low: 0, moderate: 0, high: 0, critical: 0 }
  totalDependencies: 431
```

No CVEs reported.

### Configuration Issues

| Issue | Severity | Status |
|-------|----------|--------|
| No CI/CD audit gate workflow | Medium | Open — follow-up item in `docs/TODO.md` |
| Prettier not in devDependencies | Low | Open — pre-commit hook calls `pnpm exec prettier` but prettier may not be installed as a direct dev dep |
| No test framework | Low | Open — no test coverage enforcement |

### Secrets & Credentials

- No hardcoded secrets found during this assessment.
- `.gitignore` excludes `.env`, `.env.*`, `*.key`, `secrets.yml`, `*.pem`.
- `detect-secrets` pre-commit hook is installed and configured (v1.5.0).
- No `.env` file is present in the repository — `.env.example` is therefore not generated.

## Recommendations

1. **Add GitHub Actions CI workflow** — run `pnpm audit` and `pnpm lint` on every PR to enforce quality gates automatically.
2. **Add a test framework** — Vitest is recommended for Next.js/React 19 projects; add test coverage enforcement.
3. **Pin Prettier as a devDependency** — or remove the prettier pre-commit hook to avoid failures on contributor machines without global prettier.
4. **Run periodic audits** — schedule monthly `pnpm audit` reviews or rely on Dependabot alerts (already configured).
5. **Enable branch protection** — require passing status checks before merging to `main`.

## Open Questions

- Should Prettier be added to `devDependencies` and pinned to a specific version?
- Is a CI/CD pipeline planned? If so, which platform (GitHub Actions preferred given existing `.github/` setup)?

<!-- Added by OnboardCopilot 2026-03-12 -->
