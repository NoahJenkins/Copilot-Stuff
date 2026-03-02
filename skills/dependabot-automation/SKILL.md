---
name: dependabot-automation
description: 'Automate Dependabot PR merging safely, align branch protection to current CI jobs, and remediate stored-XSS output sinks. Use when asked to set up Dependabot auto-merge, harden branch protection for CI, or fix output-encoding vulnerabilities in URL composition, templated script output (e.g. JSON-LD), or RSS/XML interpolation. Works with any GitHub-hosted repository.'
---

# Dependabot Automation & XSS Remediation

Automate Dependabot PR merging safely, align branch protection to actual CI jobs, and
remediate common stored-XSS output-encoding sinks — without changing application behavior
or adding unrelated refactors.

This skill works with **any GitHub-hosted repository**. It detects the project stack before
acting and applies language/framework-appropriate patterns throughout.

---

## Phase 0 — Project Detection

Before executing any phase, scan the repository and record:

### 0A — Package ecosystems

Check for the following manifest files and record every detected ecosystem:

| Manifest file(s) | Dependabot ecosystem | Primary language hint |
| --- | --- | --- |
| `package.json`, `package-lock.json`, `yarn.lock`, `pnpm-lock.yaml` | `npm` | JavaScript / TypeScript |
| `requirements.txt`, `setup.py`, `setup.cfg`, `pyproject.toml`, `Pipfile` | `pip` | Python |
| `go.mod` | `gomod` | Go |
| `Cargo.toml` | `cargo` | Rust |
| `pom.xml` | `maven` | Java / Kotlin |
| `build.gradle`, `build.gradle.kts` | `gradle` | Java / Kotlin |
| `Gemfile` | `bundler` | Ruby |
| `composer.json` | `composer` | PHP |
| `Dockerfile`, `docker-compose.yml` | `docker` | (container layer) |
| `*.tf` (Terraform files) | `terraform` | (infrastructure layer) |
| `.github/workflows/*.yml` | `github-actions` | (always include if workflows exist) |

Record the list as **DETECTED_ECOSYSTEMS** and the primary application language as **PRIMARY_LANG**.

### 0B — Primary framework

Inspect the detected manifests and source code to identify the primary web framework, if any.
Record as **FRAMEWORK** (examples: `Next.js`, `React`, `Remix`, `Nuxt`, `Django`, `Flask`,
`FastAPI`, `Rails`, `Laravel`, `Spring Boot`, `Gin`, `Actix-web`, `Phoenix`, or `none`).

### 0C — CI job names

Read every file in `.github/workflows/`. For each workflow file, collect the `jobs.<id>.name`
value (or the job ID if `name` is not set). Record the list as **CI_JOB_NAMES**.

If no workflow files exist, record **CI_JOB_NAMES** as empty and skip Phase B
(branch protection alignment).

### 0D — Security utility location

Based on **PRIMARY_LANG**, determine where to create the security helper module:

| Primary language | Helper path | Module type |
| --- | --- | --- |
| TypeScript / JavaScript | `lib/security.ts` (or `src/lib/security.ts` if `src/` exists) | ES module |
| Python | `<package_root>/utils/security.py` (detect `src/`, `app/`, or top-level package) | Python module |
| Go | `internal/security/security.go` | Go package |
| Rust | `src/security.rs` + `mod security;` in `lib.rs` / `main.rs` | Rust module |
| Ruby | `lib/security.rb` (Rails: `app/helpers/security_helper.rb`) | Ruby module |
| PHP | `src/Security/OutputEncoder.php` (namespace from composer.json) | PHP class |
| Java / Kotlin | `src/main/java/<base_package>/security/OutputEncoder.java` | Java class |
| Other / Unknown | `security-helpers.md` (guidance document only, no code file) | Guidance doc |

Record the determined path as **SECURITY_HELPER_PATH**.

### 0D — Report detection summary

Print a detection summary before proceeding:

```
🔍 Detected ecosystems:   <DETECTED_ECOSYSTEMS>
🔍 Primary language:      <PRIMARY_LANG>
🔍 Framework:             <FRAMEWORK>
🔍 CI job names:          <CI_JOB_NAMES>
🔍 Security helper path:  <SECURITY_HELPER_PATH>
```

Pause and ask the user to confirm or correct any detected values before continuing.

---

## Phase A — Dependabot Auto-Merge Workflow

### A1 — Create the workflow file

Create `.github/workflows/dependabot-auto-merge.yml` with the content below.

Substitute the actual values:
- `<ALLOWED_ECOSYSTEMS>`: the intersection of **DETECTED_ECOSYSTEMS** and the safe list
  `[npm, pip, gomod, cargo, bundler, composer, maven, gradle, github-actions]`
  (omit `docker` and `terraform` — those require additional review)
- `<DEPENDENCY_FILE_PATTERN>`: a `|`-separated regex matching all relevant manifest/lockfile
  names for the detected ecosystems (see table in Phase 0A)

```yaml
name: Dependabot Auto-Merge

on:
  pull_request_target:
    types: [opened, reopened, synchronize, ready_for_review]

permissions:
  contents: read
  pull-requests: write

jobs:
  auto-merge:
    name: Auto-merge Dependabot patch/minor
    runs-on: ubuntu-latest
    if: |
      github.actor == 'dependabot[bot]' &&
      github.event.pull_request.user.login == 'dependabot[bot]' &&
      github.event.pull_request.base.ref == 'main' &&
      github.event.pull_request.draft == false

    steps:
      - name: Fetch Dependabot metadata
        id: meta
        uses: dependabot/fetch-metadata@v2
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}

      - name: Check allowed ecosystem
        id: ecosystem-check
        run: |
          allowed="<ALLOWED_ECOSYSTEMS>"
          ecosystem="${{ steps.meta.outputs.package-ecosystem }}"
          if echo "$allowed" | grep -qw "$ecosystem"; then
            echo "allowed=true" >> "$GITHUB_OUTPUT"
          else
            echo "allowed=false" >> "$GITHUB_OUTPUT"
            echo "::notice::Ecosystem '$ecosystem' is not in the auto-merge allowlist."
          fi

      - name: Check allowed update type
        id: update-check
        run: |
          update_type="${{ steps.meta.outputs.update-type }}"
          if [[ "$update_type" == "version-update:semver-patch" || \
                "$update_type" == "version-update:semver-minor" ]]; then
            echo "allowed=true" >> "$GITHUB_OUTPUT"
          else
            echo "allowed=false" >> "$GITHUB_OUTPUT"
            echo "::notice::Update type '$update_type' is not eligible for auto-merge."
          fi

      - name: Verify only dependency/workflow files changed
        id: files-check
        env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: |
          files=$(gh pr view ${{ github.event.pull_request.number }} \
            --repo ${{ github.repository }} --json files --jq '.files[].path')
          invalid=$(echo "$files" | grep -Ev \
            '^(<DEPENDENCY_FILE_PATTERN>)$' || true)
          if [ -n "$invalid" ]; then
            echo "allowed=false" >> "$GITHUB_OUTPUT"
            echo "::warning::Unexpected files changed: $invalid"
          else
            echo "allowed=true" >> "$GITHUB_OUTPUT"
          fi

      - name: Auto-approve PR
        if: |
          steps.ecosystem-check.outputs.allowed == 'true' &&
          steps.update-check.outputs.allowed == 'true' &&
          steps.files-check.outputs.allowed == 'true'
        env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: |
          gh pr review ${{ github.event.pull_request.number }} \
            --repo ${{ github.repository }} \
            --approve \
            --body "Auto-approved: Dependabot patch/minor update in an allowed ecosystem."

      - name: Enable auto-merge (squash)
        if: |
          steps.ecosystem-check.outputs.allowed == 'true' &&
          steps.update-check.outputs.allowed == 'true' &&
          steps.files-check.outputs.allowed == 'true'
        env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: |
          gh pr merge ${{ github.event.pull_request.number }} \
            --repo ${{ github.repository }} \
            --auto --squash
```

### A2 — Derive the dependency file pattern

Using **DETECTED_ECOSYSTEMS**, construct `<DEPENDENCY_FILE_PATTERN>` as a pipe-separated
regex alternation covering all manifest and lockfile names for those ecosystems. Examples:

- npm only: `package\.json|package-lock\.json|yarn\.lock|pnpm-lock\.yaml`
- npm + pip: `package\.json|package-lock\.json|yarn\.lock|pnpm-lock\.yaml|requirements.*\.txt|setup\.(py|cfg)|pyproject\.toml|Pipfile(\.lock)?`
- Add `\.github/workflows/[^/]+\.ya?ml` whenever `github-actions` is in DETECTED_ECOSYSTEMS.

Write the final pattern into the workflow file before committing.

---

## Phase B — Branch Protection Alignment

> **Skip this phase** if **CI_JOB_NAMES** is empty (no workflow files exist).

### B1 — Identify the branch protection config

Check whether the repository has an existing branch protection setup script or config file.
Common locations: `scripts/setup-branch-protection.sh`, `scripts/branch-protection.json`,
`.github/branch-protection.yml`.

- If a setup script exists, read it and note the current required status check names.
- If none exists, you will create one.

### B2 — Reconcile required status checks

Compare the existing required checks (if any) against **CI_JOB_NAMES**.

- Add any CI job names that are missing from the required checks list.
- Remove any required checks that no longer match an actual job name.
- The final list must exactly match current `jobs.<id>.name` values from the workflow files
  (GitHub matches on the display name, not the job ID).

### B3 — Apply branch protection settings

The target branch protection configuration for `main` is:

```json
{
  "required_status_checks": {
    "strict": true,
    "contexts": ["<CI_JOB_NAMES — comma-separated>"]
  },
  "enforce_admins": false,
  "required_pull_request_reviews": {
    "required_approving_review_count": 1,
    "dismiss_stale_reviews": true
  },
  "restrictions": null,
  "allow_force_pushes": false,
  "allow_deletions": false
}
```

**Key decisions baked in:**
- `enforce_admins: false` — admins can push directly without a PR (preserves VS Code /
  IDE direct-push workflow for maintainers).
- 1 approving review required — Dependabot PRs get this from the auto-approve step.
- `strict: true` — branch must be up-to-date before merging.

Apply via GitHub CLI:

```bash
gh api repos/{owner}/{repo}/branches/main/protection \
  --method PUT \
  --input <path-to-protection-json>
```

Capture and display the API response to verify the applied settings.

### B4 — Update the setup script

If a setup script existed in B1, update its output/echo text to reflect the
actual config applied. Ensure any hardcoded job names in the script match
the reconciled list from B2.

---

## Phase C — Stored-XSS Remediation

This phase is conditional on **FRAMEWORK** and **PRIMARY_LANG**.

### C1 — Create the security utility module

Create the file at **SECURITY_HELPER_PATH** with the following functions,
implemented in the appropriate language:

#### Required functions

| Function | Purpose |
| --- | --- |
| `encodePathSegment(value)` | Percent-encode a single URL path segment (wraps `encodeURIComponent` or equivalent) |
| `escapeXml(value)` | Encode the five XML entities: `&`, `<`, `>`, `"`, `'` |
| `toSafeOutput(data)` | Serialize structured data to a string safe for inline script/template injection (JSON-stringify + escape `<`, `>`, `&`, U+2028, U+2029) |

#### Language implementations

**TypeScript / JavaScript:**
```typescript
// lib/security.ts — output-encoding helpers
// Use these at the sink (output point), not as broad input sanitizers.

export function encodePathSegment(value: string): string {
  return encodeURIComponent(value);
}

export function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

export function toSafeOutput(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}
```

**Python:**
```python
# utils/security.py — output-encoding helpers
import json
import urllib.parse

_XML_ESCAPES = str.maketrans({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#x27;',
})

def encode_path_segment(value: str) -> str:
    return urllib.parse.quote(value, safe='')

def escape_xml(value: str) -> str:
    return value.translate(_XML_ESCAPES)

def to_safe_output(data: object) -> str:
    return (
        json.dumps(data)
        .replace('<', r'\u003c')
        .replace('>', r'\u003e')
        .replace('&', r'\u0026')
        .replace('\u2028', r'\u2028')
        .replace('\u2029', r'\u2029')
    )
```

**Go:**
```go
// internal/security/security.go
package security

import (
    "encoding/json"
    "net/url"
    "strings"
)

func EncodePathSegment(value string) string {
    return url.PathEscape(value)
}

func EscapeXML(value string) string {
    r := strings.NewReplacer(
        "&", "&amp;", "<", "&lt;", ">", "&gt;",
        `"`, "&quot;", "'", "&#x27;",
    )
    return r.Replace(value)
}

func ToSafeOutput(data any) (string, error) {
    b, err := json.Marshal(data)
    if err != nil {
        return "", err
    }
    s := string(b)
    s = strings.ReplaceAll(s, "<", `\u003c`)
    s = strings.ReplaceAll(s, ">", `\u003e`)
    s = strings.ReplaceAll(s, "&", `\u0026`)
    return s, nil
}
```

**Ruby:**
```ruby
# lib/security.rb (or app/helpers/security_helper.rb for Rails)
require 'uri'
require 'json'

module Security
  XML_ESCAPES = { '&' => '&amp;', '<' => '&lt;', '>' => '&gt;',
                  '"' => '&quot;', "'" => '&#x27;' }.freeze

  def self.encode_path_segment(value)
    URI.encode_uri_component(value)
  end

  def self.escape_xml(value)
    value.gsub(/[&<>"']/, XML_ESCAPES)
  end

  def self.to_safe_output(data)
    JSON.generate(data)
        .gsub('<', '\u003c').gsub('>', '\u003e')
        .gsub('&', '\u0026')
  end
end
```

For other languages not listed above, implement the same three functions using the
standard library equivalents for URL percent-encoding, XML entity encoding, and
JSON serialization with `<`/`>`/`&` escape sequences.

### C2 — Find and fix XSS sinks

Search the codebase for common XSS sinks based on **FRAMEWORK** and **PRIMARY_LANG**.
Apply `encodePathSegment`, `escapeXml`, or `toSafeOutput` at the sink (output point only —
do not add broad input sanitization).

#### Sink patterns by framework

**React / Next.js / Remix / Nuxt (JSX/TSX):**

| Sink pattern | Risk | Fix |
| --- | --- | --- |
| `dangerouslySetInnerHTML` with JSON data | XSS via `</script>` in JSON | Wrap data with `toSafeOutput()` |
| Template literals in `href` or `src` using user-controlled path segments | Open redirect / path injection | Wrap segment with `encodePathSegment()` |
| String interpolation inside `<script type="application/ld+json">` | JSON-LD XSS | Wrap structured data with `toSafeOutput()` |
| RSS/XML string interpolation (e.g., in a `/feed.xml` route handler) | XML injection | Wrap strings with `escapeXml()` |

Search commands:
```bash
grep -rn "dangerouslySetInnerHTML" --include="*.tsx" --include="*.jsx" --include="*.ts" --include="*.js" .
grep -rn "application/ld+json" --include="*.tsx" --include="*.jsx" .
grep -rn "escapeXml\|escapeXML\|xmlEscape" --include="*.ts" --include="*.js" . # find existing (possibly incomplete) helpers
```

**Django / Jinja2 (Python):**

| Sink pattern | Risk | Fix |
| --- | --- | --- |
| `mark_safe()` or `{% autoescape off %}` around user data | XSS | Remove or add `escape_xml()` before `mark_safe()` |
| `format_html()` with unquoted args | XSS | Use named format args properly |
| Direct string interpolation in XML/RSS view responses | XML injection | Use `escape_xml()` |

**Flask (Python):**

| Sink pattern | Risk | Fix |
| --- | --- | --- |
| `Markup()` around user-controlled strings | XSS | Add `escape_xml()` before wrapping |
| `render_template_string()` with user input | SSTI / XSS | Avoid; if needed, escape first |

**Rails (Ruby):**

| Sink pattern | Risk | Fix |
| --- | --- | --- |
| `.html_safe` on user-controlled string | XSS | Remove or wrap with `escape_xml()` |
| `raw()` helper with user data | XSS | Remove or escape |
| ERB string interpolation in XML/RSS builder | XML injection | Use `escape_xml()` |

**Go (net/http or Gin/Echo/Fiber):**

| Sink pattern | Risk | Fix |
| --- | --- | --- |
| `text/template` used where `html/template` should be | XSS | Switch to `html/template` |
| `fmt.Fprintf(w, ...)` with user data in HTML response | XSS | Use `html/template` or `EscapeXML()` |
| Direct XML/RSS string building with `fmt.Sprintf` | XML injection | Use `EscapeXML()` |

**Generic (any language/framework):**

Search for any location where:
1. A user-controlled value is concatenated into a URL path string
2. A user-controlled value is interpolated into an XML or RSS document
3. A data structure is serialized to JSON and written inside a `<script>` tag

For each found sink, apply the appropriate helper function.

### C3 — Scope of changes

- Only modify code at identified sink locations.
- Do not add input validation, schema validation, or broad sanitization passes.
- Do not refactor surrounding code.
- If the existing codebase already has correct encoding at a sink, leave it unchanged and note it as already safe.

---

## Phase D — Validation

### D1 — Run security helper tests

Write targeted tests for the new security utility module:

**TypeScript (Jest / Vitest):**
```typescript
// Tests for lib/security.ts
import { encodePathSegment, escapeXml, toSafeOutput } from './security';

test('encodePathSegment encodes slashes and special chars', () => {
  expect(encodePathSegment('foo/bar&baz')).toBe('foo%2Fbar%26baz');
});

test('escapeXml encodes all five entities', () => {
  expect(escapeXml('<script>&"\'</script>')).toBe(
    '&lt;script&gt;&amp;&quot;&#x27;&lt;/script&gt;'
  );
});

test('toSafeOutput escapes script-breaking characters', () => {
  const result = toSafeOutput({ key: '</script>' });
  expect(result).not.toContain('</script>');
  expect(result).toContain('\\u003c');
});
```

Create equivalent tests in the appropriate test framework for the detected language
(pytest for Python, `go test` for Go, RSpec/minitest for Ruby, etc.).

Place test files adjacent to or within the project's existing test directory convention.

### D2 — Run diagnostics on edited files

For each file modified in Phases A–C, run the available linter, type checker,
and/or formatter for the detected language:

| Language | Commands to run |
| --- | --- |
| TypeScript | `npx tsc --noEmit`, `npx eslint <changed-files>` |
| Python | `python -m mypy <changed-files>`, `python -m flake8 <changed-files>` |
| Go | `go vet ./...`, `go build ./...` |
| Rust | `cargo check`, `cargo clippy` |
| Ruby | `bundle exec rubocop <changed-files>` |
| PHP | `composer run phpstan <changed-files>` |
| Java | `mvn compile` or `gradle compileJava` |

Run only tools that are already present in the project (check for config files or
`devDependencies` / equivalent). Do not install new tooling.

### D3 — Report scoped validation evidence

Even if a full test suite fails for unrelated environment reasons, capture and report:
- Output of the security helper tests (pass/fail per test case)
- Output of lint/type-check commands for changed files
- List of files changed and their validation status

---

## Phase E — Documentation

### E1 — Update TODO tracker

In `docs/TODO.md` (or the project's equivalent task tracker), add or update:

```markdown
## Security & Automation (added by dependabot-automation skill)
- [x] Add Dependabot auto-merge workflow (.github/workflows/dependabot-auto-merge.yml)
- [x] Align branch protection required checks to current CI job names
- [x] Add security output-encoding utility module (<SECURITY_HELPER_PATH>)
- [x] Remediate XSS sinks: <list found sinks or "none found">
- [ ] Quarterly review: update Dependabot ecosystem allowlist if new package managers added
- [ ] Regression tests for RSS/metadata/template output sinks (if applicable)
```

### E2 — Add a dated context note

Create `docs/context/<YYYY-MM-DD>-dependabot-automation.md` (use today's date):

```markdown
# Dependabot Automation & XSS Remediation — <YYYY-MM-DD>

## Summary

Implemented three security/automation improvements via the `dependabot-automation` skill.

## Findings

- **Detected ecosystems**: <list>
- **CI job names**: <list>
- **XSS sinks found**: <list of files:lines or "none">
- **XSS sinks already safe**: <list or "n/a">

## Changes Made

1. **Dependabot auto-merge workflow**: `.github/workflows/dependabot-auto-merge.yml`
   - Triggers on `pull_request_target` for dependabot[bot] PRs targeting `main`
   - Allows only patch/minor updates in detected ecosystems
   - Validates changed files before approving

2. **Branch protection**: Updated required status checks to match current CI job names.
   `enforce_admins: false` preserves admin direct-push capability.

3. **Security helper module**: `<SECURITY_HELPER_PATH>`
   - `encodePathSegment` — URL path segment encoding
   - `escapeXml` — XML entity encoding
   - `toSafeOutput` — safe inline script/structured data serialization

## Verification

<paste validation command outputs here>

## Follow-up Recommendations

- Review Dependabot ecosystem allowlist quarterly as the project evolves.
- Add regression tests for any RSS, metadata, or template output paths.
- Consider enabling required Dependabot security-update PRs in repo settings.
```

### E3 — Add Architecture Decision Records

Create the following ADRs in `docs/adr/` (use the next available sequence number):

**ADR: Dependabot auto-merge policy**

```markdown
# ADR NNNN — Dependabot Auto-Merge Policy

Date: <YYYY-MM-DD>
Status: Accepted

## Context

Dependabot opens PRs frequently for patch and minor dependency updates.
Manual review of routine updates creates toil without proportional security benefit.

## Decision

Auto-approve and enable squash auto-merge for Dependabot PRs that meet all conditions:
- Actor and PR author are `dependabot[bot]`
- Base branch is `main`; PR is not a draft
- Ecosystem is in the explicit allowlist: <DETECTED_ECOSYSTEMS ∩ safe list>
- Update type is `semver-patch` or `semver-minor`
- Only dependency/workflow files are changed

Major version updates and docker/terraform ecosystem updates require manual review.

## Consequences

- Routine dependency maintenance is automated, reducing toil.
- The file-change check prevents supply-chain attacks via unexpected files in the PR.
- Major version bumps remain gated on human review.
- Allowlist must be reviewed when new package managers are added to the project.
```

**ADR: Administrator bypass policy**

```markdown
# ADR NNNN — Administrator Branch Bypass Policy

Date: <YYYY-MM-DD>
Status: Accepted

## Context

Branch protection on `main` requires PR reviews and passing CI for all contributors.
Maintainers frequently push hotfixes and documentation changes directly from their IDE
(e.g., VS Code). Enforcing branch protection on admins would block this workflow.

## Decision

Set `enforce_admins: false` on branch protection for `main`.
Admins may push directly without a PR or review approval.

This is an explicit, documented bypass — not an oversight.

## Consequences

- Maintainer productivity is preserved for low-risk direct pushes.
- Admin pushes bypass CI and review gates; this is accepted risk for trusted maintainers.
- If the team grows and admin-bypass risk increases, revisit this decision.
```

**ADR: Output-encoding strategy**

```markdown
# ADR NNNN — Standardized Output-Encoding Strategy

Date: <YYYY-MM-DD>
Status: Accepted

## Context

Several output sinks in the codebase risk stored XSS via unencoded user-controlled values:
URL path composition, structured data inside inline `<script>` tags, and RSS/XML interpolation.

## Decision

Apply sink-level output encoding using a shared security utility module (`<SECURITY_HELPER_PATH>`).

Encoding strategy:
- URL path segments → `encodePathSegment` (percent-encoding)
- XML/RSS string interpolation → `escapeXml` (entity encoding)
- Inline script / structured data → `toSafeOutput` (JSON + `<`/`>`/`&` escape sequences)

Prefer encoding at the output sink rather than broad input sanitization, to preserve data
fidelity and apply the correct context-specific encoding for each sink type.

## Consequences

- Each sink encodes for its specific context — correct and minimal.
- Input sanitization is not added; raw data is stored as-is.
- New code that introduces these sink types should use the shared helpers.
```

### E4 — Update architecture/CI documentation

In `docs/architecture/README.md` (or equivalent), add a section:

```markdown
## CI Automation

### Dependabot Auto-Merge

`.github/workflows/dependabot-auto-merge.yml` automatically approves and squash-merges
Dependabot PRs for patch/minor updates in allowed ecosystems. Major version bumps and
docker/terraform updates require manual review.

**Eligibility criteria**: dependabot[bot] actor, non-draft PR targeting `main`,
allowed ecosystem, semver-patch or semver-minor update type, dependency/workflow files only.

### Branch Protection — Admin Bypass

Branch protection on `main` is configured with `enforce_admins: false`.
Administrators may push directly without a PR. See ADR NNNN for rationale.
```

---

## Deliverables Checklist

After completing all phases, confirm each item:

- [ ] `.github/workflows/dependabot-auto-merge.yml` created
- [ ] Branch protection applied and API response captured
- [ ] Security helper module created at `<SECURITY_HELPER_PATH>`
- [ ] XSS sinks patched (or confirmed none found)
- [ ] Security helper tests written and passing
- [ ] Lint/type-check clean on all changed files
- [ ] `docs/TODO.md` updated
- [ ] Context note created in `docs/context/`
- [ ] ADR(s) created in `docs/adr/`
- [ ] Architecture doc updated

---

## Constraints

- Make minimal, surgical changes only.
- Do not add unrelated refactors, new dependencies, or extra abstractions.
- Keep existing application behavior unchanged except at XSS sink locations.
- Do not install new development tooling — use only what is already present.
- If a sink already applies correct encoding, leave it unchanged.
- Docker and Terraform Dependabot ecosystems are excluded from auto-merge by default
  (infrastructure changes warrant manual review regardless of update type).
