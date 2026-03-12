# Security Baseline Report
*Generated: 2026-03-02*

## Summary
The repository has a generally clean baseline for secret handling and includes lockfiles for reproducible dependency resolution, but dependency audit results show transitive vulnerabilities in linting-related packages. No hard-coded credentials were detected in application code during pattern-based scanning. Immediate remediation should focus on dependency updates and automated security maintenance.

## Critical Findings
- No critical vulnerabilities reported by `pnpm audit`.
- High-severity vulnerabilities are present in transitive `minimatch` paths (6 findings, primarily dev-tooling dependency chains).

## Dependency Inventory
- Total dependencies: 430 (per `pnpm audit` metadata)
- Dependencies with known vulnerabilities: 2 unique packages (`ajv`, `minimatch`)
- Outdated direct dependencies: 9 (per `pnpm outdated`)
- Dependencies without lockfiles: 0 (both `pnpm-lock.yaml` and `package-lock.json` are present)

## Detailed Findings

### Known Vulnerabilities
- **High**: `minimatch` ReDoS advisories (multiple GHSA/CVE entries), including vulnerable ranges `<3.1.3` and `>=9.0.0 <9.0.7` in transitive chains.
- **Moderate**: `ajv` ReDoS (`CVE-2025-69873`, GHSA-2g4f-4pwh-qvx6), vulnerable range `<6.14.0`.

### Configuration Issues
- No CI/CD security scanning workflow is configured.
- Both npm and pnpm lockfiles exist, which can cause divergent dependency resolution if both are used by contributors.

### Secrets & Credentials
- No probable hard-coded secrets were detected in app source during regex-based scan.
- `.gitignore` includes secret-related patterns, and onboarding updates added broader secret file coverage.

## Recommendations
1. Prioritize dependency updates to resolve vulnerable `minimatch`/`ajv` transitive paths (upgrade lint/tooling dependency tree where fixes are available).
2. Add Dependabot or Renovate to automate patch/minor dependency updates and security advisories.
3. Add CI security checks (e.g., `pnpm audit --audit-level=high` and secret scanning) on pull requests.

## Open Questions
- Should the project enforce pnpm-only usage and remove `package-lock.json` to avoid drift?
- Should high-severity vulnerabilities in devDependencies be treated as release blockers for this website project?
- Which dependency update policy (automatic vs scheduled) best fits maintainer workflow?
