# Tooling Compatibility Matrix (Phase 1)

## Summary
Phase 1 validated tooling compatibility boundaries and applied a low-risk transitive dependency remediation patch using pnpm overrides. The selected approach avoided major framework/toolchain upgrades while resolving known `minimatch` and `ajv` advisories. Post-patch validation confirms successful lint/build and zero reported audit advisories.

## Options/Findings

### Compatibility Matrix

| Package | Current | Candidate | Constraint / Compatibility Signal | Phase 1 Decision |
|---|---:|---:|---|---|
| `next` | `16.1.6` | keep | Project baseline; paired with `eslint-config-next` same major | Keep pinned |
| `eslint-config-next` | `16.1.6` | keep | Peer: `eslint >=9.0.0` | Keep pinned |
| `eslint` | `9.39.2` | `10.0.2` | Major bump available; unknown behavior changes vs current Next lint stack | Defer to later phase |
| `typescript` | `^5.9.3` | keep | Compatible with current lint/config stack | Keep |
| `react` / `react-dom` | `19.2.3` | `19.2.4` | Patch updates available; unrelated to current security findings | Defer to dedicated app update PR |
| `minimatch` (transitive) | `3.1.2` / `9.0.5` | `3.1.4` / `9.0.7` | Addresses high-severity advisories in detected ranges | Upgrade via override |
| `ajv` (transitive) | `6.12.6` | `6.14.0` | Addresses moderate advisory (`<6.14.0`) | Upgrade via override |

### Safe Upgrade Patch Applied
- Added targeted overrides in `package.json`:
  - `ajv@6.12.6` → `6.14.0`
  - `minimatch@3.1.2` → `3.1.4`
  - `minimatch@9.0.5` → `9.0.7`
- Regenerated lockfile via `pnpm install`.

### Validation Results
- `pnpm lint` ✅
- `pnpm build` ✅
- `pnpm audit --json` ✅
  - Before: High `6`, Moderate `1`, Advisories `7`
  - After: High `0`, Moderate `0`, Advisories `0`

### Observed Follow-up Risk
- Next.js build warning indicates multiple lockfiles are present in parent/workspace context, which can cause workspace root ambiguity.

## Open Questions
- Should `package-lock.json` be removed to enforce pnpm-only resolution and silence multi-lockfile ambiguity?
- Should Phase 2 include conservative direct dependency updates (`react` patch, selected dev tooling minors) now that transitive vulnerabilities are cleared?
- Should `eslint@10` adoption be evaluated in a separate compatibility spike PR?
