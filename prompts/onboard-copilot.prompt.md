---
description: Brownfield repository onboarding for GitHub Copilot — detects and codifies existing coding standards, installs and orchestrates specialized agents, and establishes living documentation structure (ADR, architecture, context, researchReports). Run /sync-agents after setup to propagate to Claude Code, Cursor, and other AI tools.
---

# OnboardCopilot: GitHub Copilot Repository Setup

Scan this repository and configure it for effective GitHub Copilot usage. This prompt is **brownfield-first** — it assumes an existing codebase and extracts real conventions from it rather than inventing them.

## Repository Mode

Before starting:

1. **Check for existing source code**: Look for source files (`.js`, `.ts`, `.py`, `.go`, `.rs`, `.java`, `.rb`, etc.), dependency manifests (`package.json`, `requirements.txt`, `go.mod`, etc.), and build configurations.
2. **Classify**:
   - **Brownfield** (existing code): Proceed with codebase scanning as described below.
   - **Greenfield** (no source code, no dependency manifests): Ask the user for their intended stack before proceeding.

3. **Greenfield stack prompt**: If no source code exists, ask:
   - **Language(s)**: e.g., TypeScript, Python, Go, Rust
   - **Framework(s)**: e.g., Next.js, FastAPI, Spring Boot, Gin
   - **Package manager**: e.g., npm, pnpm, pip, poetry, cargo
   - **Testing framework**: e.g., Jest, Vitest, pytest, go test
   - **Deployment target**: e.g., Vercel, AWS, Docker, Kubernetes

> Throughout this document, **"detected tech stack"** means either scanned from existing code (brownfield) or provided by the user (greenfield).

## General Guidance

### Conditional Logic
- **Files already exist**: Always read existing content first. Merge and preserve — never overwrite.
- **Monorepo with multiple languages**: Apply patterns for ALL detected languages.
- **CI/CD not present**: Skip CI/CD documentation. Note absence in the summary report.
- **No `.env` file**: Do not create `.env.example`.

### Merging Strategy
1. Read existing file content first
2. Preserve all existing entries and configurations
3. Add new content in clearly labeled sections (e.g., `# Added by OnboardCopilot`)
4. Remove exact duplicates; keep existing version when formatting differs

### Shell Command Safety
- Prefer direct single-file commands over loop-driven bulk commands.
- Avoid `for ...; do ...; done` sequences when equivalent direct commands are possible.
- If a command is blocked, immediately rewrite as explicit direct commands and continue.
- Never stop the onboarding flow because a command style was blocked.

### Sub-Agent Delegation
After installing agents in Section 3, delegate specialized work:

| Task | Delegate |
|------|----------|
| Codebase analysis | `@research-agent` |
| Documentation authoring | `@documentation-specialist` |
| Security assessment | `@security-specialist` |
| Code standards validation | `@code-reviewer` |

If a sub-agent is not yet installed, perform the work directly and note it in the summary report.

---

## 1. Codebase Analysis

> **Sub-agent delegation**: Use `@research-agent` when available. Provide the repository root path and ask it to identify all technologies, patterns, and conventions listed below.

> **Greenfield mode**: Skip scanning. Record the user's tech stack answers as the analysis output.

**Technology detection:**
- Primary languages and versions
- Frameworks and libraries (with versions)
- Testing tools and patterns
- Build systems and package managers
- CI/CD configuration files
- Code style tools (linters, formatters, configs present)
- Project structure and architecture patterns
- Containerization setup (Dockerfile, docker-compose, .devcontainer)
- Monorepo tooling (turborepo, nx, pnpm workspaces, etc.)

**Brownfield coding standards extraction** — critical input for Section 2:
- Naming conventions: which style applies where (camelCase, snake_case, PascalCase, kebab-case)
- File and folder organization pattern (feature-based, layer-based, domain-based, etc.)
- Import/module structure and ordering conventions
- Error handling pattern (exceptions, result types, error callbacks, typed errors)
- Async pattern (async/await, callbacks, reactive streams, etc.)
- Testing pattern: file naming, describe/it structure, mocking approach, coverage expectations
- Comment and documentation conventions (JSDoc, docstrings, inline comments, etc.)
- API/interface design conventions (REST naming, response shape, pagination, etc.)
- State management patterns (if applicable)

---

## 2. Coding Standards & AGENTS.md

Create or update `AGENTS.md` at the repo root. This is the universal instruction file read natively by GitHub Copilot, OpenAI Codex, Cursor, Gemini CLI, VS Code, and OpenCode. A single file provides broad multi-tool coverage.

> **Brownfield requirement**: All coding standards in `AGENTS.md` must be derived from actual patterns detected in Section 1. Do not invent or assume conventions — reflect what the codebase already does. Where no clear pattern exists, use `# TODO: Define convention` as a placeholder.

### Root `AGENTS.md` Size Policy (mandatory)

Keep root `AGENTS.md` **under 100 lines**. Root contains only universal, always-on guidance:
- Project overview (language/framework/architecture, short form)
- Detected coding standards summary
- Command shortlist (build, test, lint, dev)
- Critical security guardrails
- Docs-update rule (short pointer)
- Sub-agent delegation index

Do **not** put long checklists, ADR templates, doc format prose, or extended examples in root `AGENTS.md`.

### Nested `AGENTS.md` decomposition (when content exceeds 100 lines)

Split verbose content into nested files and reference them from root:
- `docs/AGENTS.md` — ADR/context/researchReport documentation process details
- `app/AGENTS.md` — route/framework-specific implementation rules
- `components/AGENTS.md` — UI/component conventions and accessibility rules
- `lib/AGENTS.md` — shared utility and integration guidance
- `.github/AGENTS.md` — CI/workflow/review automation conventions

Rules:
1. Root keeps global constraints and short pointers to nested files.
2. Nested files hold verbose/scoped guidance only — avoid repeating root content.
3. If a section applies to one directory, move it out of root.

### Root `AGENTS.md` Template

```markdown
# [Project Name] — AI Agent Instructions

## Project Overview
- Language(s): [detected]
- Framework(s): [detected]
- Architecture: [detected — e.g., MVC, layered, hexagonal, feature-based]
- Package manager: [detected]

## Coding Standards

### Style
- Naming: [detected per context — e.g., camelCase for variables/functions, PascalCase for classes/components, UPPER_SNAKE for constants]
- Files: [detected — e.g., kebab-case, PascalCase for components]
- Imports: [detected ordering/grouping pattern]
- Error handling: [detected — e.g., throw typed errors, return Result types, use error callbacks]
- Async: [detected — e.g., async/await preferred, no raw promise chains]

### Testing
- Framework: [detected]
- File naming: [detected — e.g., *.test.ts co-located, *.spec.ts in __tests__/]
- Structure: [detected — e.g., describe/it, test classes]
- Mocking: [detected — e.g., vi.mock, jest.spyOn, no manual mocks]

### API/Interface Conventions
[Detected patterns — e.g., RESTful resource naming, response envelope shape, error format]

## Build & Development
- Build: [detected or # TODO]
- Test: [detected or # TODO]
- Lint: [detected or # TODO]
- Dev server: [detected or # TODO]

## Security
- Never commit secrets, credentials, API keys, or tokens
- Use environment variables for sensitive configuration
- Validate and sanitize all user input
- Use parameterized queries — no string interpolation in queries
- Keep dependencies patched

## Documentation Update Policy
For non-trivial changes, update docs in the same turn without asking:
- `docs/TODO.md` — update task tracker
- `docs/adr/` — create ADR for architectural decisions
- `docs/context/` — add research and planning notes
- `docs/architecture/` — update for system design changes
- `docs/researchReports/` — add formal research findings
See `docs/AGENTS.md` for formats and triggers. A task is incomplete until docs are updated.

## Information Sources
1. **Documentation tools** (Context7 MCP, library fetchers) — use when available
2. **First-party official docs** — learn.microsoft.com, GitHub docs, vendor portals
3. **Never rely on training data alone** for current versions, deprecations, or breaking changes

## Sub-Agent Delegation
- `@research-agent` — technical research, dependency lookups, codebase analysis
- `@code-reviewer` — code quality, standards adherence, maintainability
- `@security-specialist` — security review, vulnerability analysis
- `@documentation-specialist` — ADRs, architecture docs, context and research notes
[See `.github/agents/` for additional stack-specific agents when installed]
```

### Nested `docs/AGENTS.md`

Create `docs/AGENTS.md` with detailed documentation process rules:

```markdown
# docs/AGENTS.md

## Scope
Documentation process for ADRs, context notes, architecture docs, and research reports.

## ADR Rules
- Location: `docs/adr/` — naming: `NNNN-short-title.md`
- ADRs are append-only and immutable — never delete or edit an existing ADR
- Required sections: Status, Context, Options Considered, Decision, Consequences
- Write an ADR when: structural changes, dependency additions, non-functional requirement
  decisions, interface design choices, or technology selections are made
- If a decision is reversed: create a new ADR that supersedes the old one (do not edit)

## Architecture Docs
- Location: `docs/architecture/`
- Update when: system design changes, new components added, data flow modified
- Each doc should include: purpose, current state, key design decisions, diagrams (Mermaid preferred)

## Context Notes
- Location: `docs/context/` — naming: `YYYY-MM-DD-topic-name.md`
- Informal and exploratory: research sessions, planning discussions, investigation summaries
- Required sections: Summary (2–3 sentences), Findings, Open Questions
- When a context note is created alongside an ADR, add `<!-- Related ADR: [ADR NNNN](../adr/NNNN-short-title.md) -->` at the bottom of the context note file

## Research Reports
- Location: `docs/researchReports/` — naming: `YYYY-MM-DD-topic-name.md`
- Formal and reference-grade: technology evaluations, comparative analyses, spike results
- Required sections: Purpose, Methodology, Findings, Recommendations, References
- Use when findings directly justify an architectural decision or inform an ADR

## Task Tracker
- `docs/TODO.md` — living task tracker; update the `Last Updated` date on every change
- Sections: active work, Blocked (with dependency notes), Follow-ups, Definition of Done
- Add newly discovered tasks during execution; mark completed immediately
```

If a generated root `AGENTS.md` exceeds 100 lines, split verbose content into nested files and regenerate root until compliant.

---

## 3. Custom Agents Installation

Install specialized GitHub Copilot agents into `.github/agents/`. All `onboarding-core` tagged agents are mandatory.

### Known-Good Install Snippet (macOS/Linux)

```bash
set -euo pipefail

mkdir -p .github/agents

core_agents=(
  code-reviewer.agent.md
  documentation-specialist.agent.md
  research-agent.agent.md
  security-specialist.agent.md
)

expanded_agents=()

# Set these booleans from Section 1 detection:
# has_frontend=true|false  has_backend=true|false
# has_data=true|false      has_devops=true|false

if [[ "${has_frontend:-false}" == "true" ]]; then
  expanded_agents+=(frontend-specialist.agent.md)
fi
if [[ "${has_backend:-false}" == "true" ]]; then
  expanded_agents+=(backend-specialist.agent.md)
fi
if [[ "${has_data:-false}" == "true" ]]; then
  expanded_agents+=(data-specialist.agent.md)
fi
if [[ "${has_devops:-false}" == "true" ]]; then
  expanded_agents+=(devops-specialist.agent.md)
fi

selected_agents=("${core_agents[@]}" "${expanded_agents[@]}")

for f in "${selected_agents[@]}"; do
  url="https://raw.githubusercontent.com/NoahJenkins/Copilot-Stuff/main/agents/$f"
  tmp="$(mktemp)"

  curl --fail --location --silent --show-error \
    --retry 3 --retry-all-errors --retry-delay 1 \
    -o "$tmp" "$url"

  test -s "$tmp"
  head -n 1 "$tmp" | grep -q '^---'
  grep -q 'onboarding-tags' "$tmp"

  cp "$tmp" ".github/agents/$f"
  rm -f "$tmp"

  echo "INSTALLED:$f"
done

# Mandatory post-install verification
for f in "${core_agents[@]}"; do
  test -s ".github/agents/$f"
  head -n 1 ".github/agents/$f" | grep -q '^---'
  grep -q 'onboarding-tags' ".github/agents/$f"
done

echo "VERIFIED:all-onboarding-core-agents"
```

### Tag-Driven Agent Selection

Use `https://github.com/NoahJenkins/Copilot-Stuff/tree/main/agents` as the canonical source. Do not treat the target repo's local `agents/` directory as a source signal.

1. Inspect all `*.agent.md` files and parse `<!-- onboarding-tags: ... -->` metadata.
2. Install all `onboarding-core` tagged files as mandatory.
3. Install `onboarding-expanded` files only when detected stack warrants:
   - Frontend indicators (UI framework, component dirs, client bundler) → `frontend-specialist.agent.md`
   - Backend/service indicators (API/server frameworks, service entrypoints) → `backend-specialist.agent.md`
   - DB/ORM/migrations → `data-specialist.agent.md`
   - CI/CD/infrastructure (workflows, Docker/K8s/Terraform) → `devops-specialist.agent.md`
4. In greenfield mode, derive selection from user-provided stack.
5. If no `onboarding-core` agents resolve, stop and report a configuration error.

### Download Requirements

- Canonical raw URLs: `https://raw.githubusercontent.com/NoahJenkins/Copilot-Stuff/main/agents/<file>.agent.md`
- Validate before install: HTTP 200, non-empty content, starts with `---`, contains `onboarding-tags`
- **Do not create stub files**: Write the downloaded content directly to `.github/agents/<filename>` in a single operation. Do not pre-create a placeholder file and then append the download — this produces duplicate frontmatter and a malformed agent file. Each agent file must contain exactly one YAML frontmatter block (`---` ... `---`).
- Print `INSTALLED:<filename>` after each success
- Retry failed downloads up to 3 times; if still failing, fail with error (no local fallback for core agents)
- Optional `onboarding-expanded` failures are non-blocking warnings

### Failure Handling

- If terminal output shows partial execution (setup lines appear but no `INSTALLED:` lines), re-run in smaller units (one file per command)
- Record in the summary report whether install succeeded first attempt or required recovery
- Any missing-agent error must reference canonical GitHub outcomes — do not report based on local root checks

---

## 4. Agent Orchestration

Define how agents collaborate. After agents are installed, document delegation patterns in `AGENTS.md` and `docs/AGENTS.md`.

### Delegation Map

After confirming which agents were installed in Section 3, update the **Sub-Agent Delegation** section in root `AGENTS.md` to include every installed agent — both core and expanded. For example, if `@frontend-specialist` was installed, add: `- @frontend-specialist — frontend architecture, component design, accessibility`. Do not leave expanded agents out of the delegation list.

Ensure root `AGENTS.md` delegation index reflects all installed agents:

| Task Type | Primary Agent | Notes |
|-----------|--------------|-------|
| Technical research, dependency lookups | `@research-agent` | Use for all codebase/library research |
| Code quality, standards review | `@code-reviewer` | Escalate security findings to `@security-specialist` |
| Security scan, vulnerability analysis | `@security-specialist` | Provide dependency manifest paths and tech stack |
| ADR authoring, architecture/context docs | `@documentation-specialist` | Provide all context gathered before delegating |
| Frontend architecture/performance | `@frontend-specialist` (if installed) | Fallback: `@code-reviewer` |
| Backend/API/reliability | `@backend-specialist` (if installed) | Fallback: `@code-reviewer` |
| Database/schema/migrations | `@data-specialist` (if installed) | Fallback: `@code-reviewer` |
| CI/CD/deployment | `@devops-specialist` (if installed) | Fallback: `@security-specialist` for pipeline security |

### Handoff Protocol

Add to `docs/AGENTS.md`:

```markdown
## Agent Handoff Protocol
When delegating to a sub-agent, always provide:
- Task objective and scope
- Relevant file paths from Section 1 analysis
- Prior findings (previous agent output, if any)
- Expected output format

Escalation patterns:
- Research findings that require decisions → @documentation-specialist creates ADR
- Code review findings with security impact → escalate to @security-specialist
- Any architectural change discovered → @documentation-specialist creates context note + ADR
```

---

## 5. Documentation Structure

Create the following directories and files if they don't exist. If they exist, merge and preserve all current content.

### docs/architecture/
- Purpose: High-level architecture overviews, system diagrams, data flow documentation
- Update when: overall system design changes, new components added, interfaces modified
- Each document: purpose, current state, key design decisions, diagrams (Mermaid preferred)

### docs/adr/ (Architecture Decision Records)
- Purpose: Numbered decision records for significant architectural choices
- Naming: `NNNN-short-title.md` (e.g., `0001-adopt-postgresql.md`)
- ADRs are append-only and immutable — never delete or edit existing ones
- Required sections: Status, Context, Options Considered, Decision, Consequences
- Create a new ADR to supersede an old one if a decision is reversed

### docs/context/
- Purpose: Exploratory research, planning session notes, working documentation
- Naming: `YYYY-MM-DD-topic-name.md`
- Required sections: Summary (2–3 sentences), Findings/Options, Open Questions
- When a context note is created alongside an ADR, add `<!-- Related ADR: [ADR NNNN](../adr/NNNN-short-title.md) -->` at the bottom of the context note file

### docs/researchReports/
- Purpose: Formal, reference-grade research — technology evaluations, comparative analyses, spike results
- Naming: `YYYY-MM-DD-topic-name.md`
- Required sections: Purpose, Methodology, Findings, Recommendations, References
- Use when findings directly inform an architectural decision or ADR

### docs/TODO.md
Create if it does not exist; merge if it does. Add a `Last Updated` line (ISO date). Use this template when creating new:

```markdown
# Project Task Tracker

Last Updated: [YYYY-MM-DD]

> Living document for major project tasks. Update continuously during planning and implementation.

## Onboarding
- [ ] Run codebase analysis and extract coding standards
- [ ] Author AGENTS.md with detected coding standards
- [ ] Install and verify onboarding-core agents
- [ ] Define agent orchestration patterns
- [ ] Establish docs structure (adr/, architecture/, context/, researchReports/)
- [ ] Create initial ADR

## Architecture & Documentation
- [ ] Add/update architecture documentation
- [ ] Add context notes with inline ADR links where applicable
- [ ] Record architectural decisions as ADRs

## Security & Quality
- [ ] Run dependency/security audit
- [ ] Review secret handling and .gitignore coverage
- [ ] Address critical/high findings

## Blocked
- [ ] # TODO: Add blocked tasks with dependency notes

## Follow-ups
- [ ] # TODO: Add team-specific onboarding tasks

## Definition of Done
- [ ] Acceptance criteria met
- [ ] Relevant docs updated (ADRs, context notes, architecture docs as applicable)
- [ ] Security/quality checks for the change completed
- [ ] Follow-up work captured as new TODO items
```

---

## 6. Initial ADR

> **Sub-agent delegation**: Use `@documentation-specialist`. It is pre-configured with ADR format rules and immutability requirements.

**Before creating**: List all files currently in `docs/adr/` and identify every existing `NNNN` prefix (e.g., `0001`, `0002`). Use the next sequential number — if `0001-*.md` already exists, use `0002`; if `0001` and `0002` exist, use `0003`; and so on. Do not create two files starting with the same number.

Create `docs/adr/[NNNN]-adopt-copilot-agent-setup.md` (substitute the actual next available number for `[NNNN]`):

```markdown
# ADR [NNNN]: Adopt GitHub Copilot Agent Setup with Living Documentation

## Status
Accepted

## Context
This repository needed a systematic approach to:
1. Configure GitHub Copilot with accurate, repo-specific coding standards extracted from the
   actual codebase — not generic assumptions
2. Install and orchestrate specialized AI agents for research, review, security, and documentation
3. Establish a living documentation structure that stays in sync with code evolution

Without this setup, AI tooling operates on generic patterns misaligned with actual conventions,
documentation knowledge decays over time, and architectural decisions lose their rationale.

## Options Considered

### Option 1: No custom configuration
**Pros:** Zero overhead
**Cons:** Copilot produces generic suggestions misaligned with actual patterns; no specialized agents

### Option 2: Custom instructions only (no agents, no docs structure)
**Pros:** Simple; low maintenance
**Cons:** Single AI context handles all concerns; no specialization; no decision trail

### Option 3: Custom instructions + specialized agents + living documentation
**Pros:**
- AGENTS.md grounded in real codebase conventions
- Specialized agents handle research, review, security, and documentation without context pollution
- Architectural decisions have traceable, searchable history in-repo
- /sync-agents propagates setup to Claude Code, Cursor, Windsurf, and other AI tools

**Cons:**
- Initial setup investment
- Team must maintain ADR discipline for significant decisions

## Decision
Adopt Option 3:
- `AGENTS.md` as universal instruction file (read natively by Copilot, Codex, Cursor, Gemini CLI, VS Code)
- Core agent suite: `@research-agent`, `@code-reviewer`, `@security-specialist`, `@documentation-specialist`
- Optional expanded agents based on detected stack
- Docs structure: `docs/adr/`, `docs/architecture/`, `docs/context/`, `docs/researchReports/`
- `/sync-agents` for ongoing propagation to all configured AI tools

## Consequences

### Positive
- Copilot suggestions align with actual codebase conventions
- Specialized agents handle concerns without polluting each other's context
- Architectural decisions have traceable, searchable history
- All AI tools in the workflow share the same project context via /sync-agents

### Negative
- Team must create ADRs for significant decisions (low friction, but requires discipline)
- Agent instructions need review as codebase evolves

### Mitigation
- `docs/AGENTS.md` provides documentation triggers and format templates
- PR template includes ADR prompt for architectural changes
- Periodic `AGENTS.md` review during retrospectives
```

---

## 7. Security Baseline

> **Sub-agent delegation**: Use `@security-specialist`. Provide detected dependency manifest paths and tech stack from Section 1.

> **Greenfield mode**: No dependencies to scan. Generate a proactive security checklist for the intended stack instead. Title it "Security Setup Checklist".

> **Existing baseline**: Before creating, check **both** `docs/context/` and `docs/researchReports/` for any file matching `*security-baseline*`. If a match exists and it contains the required sections (Critical Findings, Dependency Inventory, Detailed Findings), skip creation entirely and reference the existing file path in the summary report instead. Only create a new file if no baseline exists, or if the existing one is missing required sections.

> **Terminal commands unavailable**: If audit commands cannot be run (e.g., no terminal access in agent mode), document what was inspectable (package.json/lockfile analysis, hardcoded secret patterns in source, `.gitignore` coverage) and mark actual vulnerability counts as `# TODO: run [audit command]`.

Create `docs/researchReports/[YYYY-MM-DD]-security-baseline.md`:

```markdown
# Security Baseline Report
*Generated: [Date]*

## Summary
[2–3 sentences: overall security posture and most critical findings]

## Critical Findings
[Issues requiring immediate attention before production]

## Dependency Inventory
- Total dependencies: [count]
- Dependencies with known vulnerabilities: [count]
- Outdated dependencies (>1 year): [count]
- Missing lockfile: [yes/no — lockfiles ensure reproducible builds and auditability]

## Detailed Findings

### Known Vulnerabilities
[CVEs with severity (Critical/High/Medium/Low) and affected components]

### Configuration Issues
[Security configuration concerns]

### Secrets & Credentials
[Detected patterns — DO NOT include actual values]

## Recommendations
1. [Prioritized list of security improvements]

## Open Questions
[Unresolved security concerns for team discussion]
```

**Audit commands by stack:**
- Node.js: `npm audit` or `yarn audit`
- Python: `pip audit` or `safety check`
- Ruby: `bundle audit`
- Rust: `cargo audit`
- Go: `govulncheck ./...`

Check for `dependabot.yml` or `renovate.json` presence. Flag dependencies without lockfiles.

---

## 8. Sync to All AI Tools

After completing setup, run `/sync-agents` to propagate `AGENTS.md` and `.github/agents/` to all configured AI coding tools in the repository.

`/sync-agents` detects active AI tool configurations and:
- Mirrors `AGENTS.md` into each detected tool's instruction format (Claude Code → `CLAUDE.md`, Cursor → `.cursor/rules/`, Windsurf → `.windsurf/rules/`, etc.)
- Syncs `.github/agents/*.agent.md` to `.claude/agents/` as Claude Code sub-agents
- Syncs `.github/skills/` to `.claude/skills/`
- Reports all files written and any model normalization applied

> **Why this matters**: `AGENTS.md` is read natively by GitHub Copilot, OpenAI Codex, OpenCode, and Cursor, but Claude Code, Windsurf, Cline, and others need synced copies. Running `/sync-agents` ensures all AI tools in your workflow share the same project context without maintaining separate files.

---

## 9. Optional Baseline Setup

Complete these sections only when applicable. Check skip conditions before proceeding.

### Environment Configuration

**Skip if** no `.env` file exists in the repository.

If `.env` exists:
- Scan for environment variable patterns (`process.env.*`, `os.getenv()`, `os.environ[]`, `ENV['']`, `os.Getenv()`, `$VARIABLE`)
- Create or update `.env.example` with all detected variables as empty or example values
- Add security warning at top: `# ⚠️ Never commit actual secrets to version control`
- Group by category (Database, API Keys, Feature Flags, etc.)
- Mark required vs optional clearly

### .gitignore Enhancement

Update `.gitignore` with tech-stack patterns. Preserve all existing entries.

Common additions by language:
- Python: `__pycache__/`, `*.py[cod]`, `.pytest_cache/`, `venv/`, `.venv/`
- Node.js: `node_modules/`, `dist/`, `build/`, `npm-debug.log*`
- Java: `target/`, `*.class`, `*.jar`
- Go: `bin/`, `*.exe`
- Rust: `target/`
- Universal: `.env`, `.env.local`, `.env.*.local`, `.DS_Store`, `Thumbs.db`, `*.log`, `*.pem`, `*.key`
- IDE: `.idea/`, `.vscode/*` with exceptions for `!.vscode/settings.json`, `!.vscode/extensions.json`

### IDE Configuration

**Skip if** `.vscode/` does not already exist — do not create the directory.

If `.vscode/` exists, update only:
- `.vscode/extensions.json`: Add `github.copilot`, `eamodio.gitlens`, and language-appropriate extensions
- `.vscode/settings.json`: Enable `editor.formatOnSave`, set default formatter, enable detected linters. Merge keys — never overwrite existing preferences.

### GitHub Templates

**Skip if** `.github/` does not already exist.

If `.github/` exists, create if missing:
- `.github/ISSUE_TEMPLATE/bug_report.md` — description, reproduction steps, expected/actual behavior, environment
- `.github/ISSUE_TEMPLATE/feature_request.md` — problem statement, proposed solution, acceptance criteria
- `.github/PULL_REQUEST_TEMPLATE.md` — change type, related issues, changes made, testing, documentation checklist (include ADR checkbox for architectural changes)

### Pre-commit Hooks

**Skip if** `pre-commit` would be an unusual dependency for this project's ecosystem.

Create `.pre-commit-config.yaml` if appropriate:
- Universal hooks: trailing whitespace, end-of-file fixer, merge conflict check, secrets detection
- Language-specific: black/isort/flake8 (Python), prettier/eslint (JS/TS), gofmt (Go), rustfmt (Rust)
- Look up latest stable release tags — do not hardcode versions
- Keep total hook time < 2 seconds to avoid developer friction
- For non-Python projects, prefer `lefthook` over requiring `pre-commit`; do not create `.husky/`

### CI/CD Pipeline Documentation

**Skip if** no CI/CD configuration exists (`.github/workflows/`, `.circleci/`, `.gitlab-ci.yml`, `Jenkinsfile`, etc.).

> **Sub-agent delegation**: Use `@documentation-specialist` with detected CI/CD file paths.

Create `docs/architecture/ci-cd-pipeline.md` documenting: pipeline stages (triggers, actions, success criteria), deployment environments, required secrets/env vars (names only), common failure scenarios, and how to update the pipeline.

---

## 10. Summary Report

> **Sub-agent delegation**: Use `@documentation-specialist` with complete results from all previous sections.

Create `docs/context/[YYYY-MM-DD]-onboarding-report.md`:

```markdown
# Repository Onboarding Report
*Generated: [Date]*

## Executive Summary
[2–3 sentences: what was set up, what was detected, and the key outcome]

## Onboarding Mode
- [ ] Brownfield (existing codebase scanned)
- [ ] Greenfield (scaffolded from intended tech stack)

## Technologies Detected
- Languages:
- Frameworks:
- Testing:
- Build/CI:

## Files Created / Modified

### Copilot & Agent Configuration
- [ ] `AGENTS.md` — root instructions with detected coding standards
- [ ] `docs/AGENTS.md` — detailed documentation process rules
- [ ] `.github/agents/` — installed agents: [list filenames]

### Documentation Structure
- [ ] `docs/adr/`
- [ ] `docs/architecture/`
- [ ] `docs/context/`
- [ ] `docs/researchReports/`
- [ ] `docs/TODO.md`
- [ ] `docs/adr/[NNNN]-adopt-copilot-agent-setup.md`

### Security
- [ ] `docs/researchReports/[date]-security-baseline.md`

### Optional Baseline (if applicable)
- [ ] `.env.example`
- [ ] `.gitignore` (enhanced)
- [ ] `.vscode/` (updated)
- [ ] `.github/ISSUE_TEMPLATE/`
- [ ] `.github/PULL_REQUEST_TEMPLATE.md`
- [ ] `.pre-commit-config.yaml`
- [ ] `docs/architecture/ci-cd-pipeline.md`

## Custom Agents Installed

### Core (mandatory)
1. `@research-agent` — technical research and codebase analysis
2. `@code-reviewer` — code quality and standards adherence
3. `@security-specialist` — vulnerability analysis and secure coding
4. `@documentation-specialist` — ADRs, architecture docs, context and research notes

### Expanded (stack-dependent)
[List any installed expanded agents]

## Recommended Next Steps

### Immediate
1. **Review `AGENTS.md`** — validate that detected coding standards match team expectations; update any `# TODO` placeholders
2. **Run `/sync-agents`** — propagate `AGENTS.md` and agents to Claude Code, Cursor, Windsurf, and other detected AI tools
3. **Test each agent** — try `@research-agent`, `@code-reviewer`, and `@documentation-specialist` on real tasks

### This Week
1. Address critical security findings in `docs/researchReports/[date]-security-baseline.md`
2. Create `docs/architecture/` overview documenting the high-level system design
3. Populate any `# TODO` placeholders left in `AGENTS.md`

### Ongoing
- Run `/sync-agents` after any significant update to `AGENTS.md` or `.github/agents/`
- Create ADRs for architectural decisions — use `@documentation-specialist` to author them
- Maintain `docs/TODO.md` as a living tracker
- Monthly dependency audits using language-appropriate audit tools

## Security Reminders
⚠️ Never commit `.env` files or actual secrets
⚠️ Review security baseline before production deployment
⚠️ Enable pre-commit hooks to prevent accidental secret commits

---

**Onboarding Complete!** Your repository is now configured with accurate coding standards, specialized agents, and a living documentation structure. Run `/sync-agents` to propagate to all configured AI tools.
```

---

## Execution Instructions

Execute all tasks in the order listed above. For each task:

1. **Check applicability** — evaluate whether the section applies (see skip conditions)
2. **Read before writing** — read existing files before creating or modifying; never overwrite without merging
3. **Detect, don't invent** — coding standards in `AGENTS.md` must reflect actual codebase patterns from Section 1
4. **Preserve existing content** — add new content in labeled sections; keep all existing entries
5. **Use `# TODO:` for unknowns** — placeholder where team-specific information is needed
6. **Delegate after Section 3** — use `@documentation-specialist` for all docs authoring once agents are installed
7. **Completion gate** — a task is incomplete until all required `docs/` updates are applied
8. **Actively maintain `docs/TODO.md`** — add discovered tasks; mark completed immediately
9. **Validate root `AGENTS.md` size** — if over 100 lines, split into nested files and regenerate root
10. **Skip gracefully** — if a section cannot be completed, note it in the summary and move on
11. **End with `/sync-agents`** — always conclude by running `/sync-agents` to distribute to all configured AI tools

After completing all tasks, provide a summary of:
- What was created and modified
- What requires manual review or configuration
- Any warnings, blocks, or skipped sections
- Reminder to run `/sync-agents`
