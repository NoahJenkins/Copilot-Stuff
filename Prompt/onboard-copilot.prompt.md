---
description: Automated repository onboarding that scans the repo and creates custom instructions, documentation structure, IDE configuration, GitHub templates, security baseline, and development environment setup
---

# OnboardCopilot: Automated Repository Setup

Scan this repository and perform the following comprehensive onboarding tasks.

## General Guidance

### Edge Cases & Conditional Logic
Before executing each section, evaluate whether it applies to this repository:
- **New/empty repository with no git history**: Skip CODEOWNERS generation (Section 6). Create placeholder templates instead.
- **No environment variables detected**: Create a minimal `.env.example` with a comment noting no variables were found, plus common placeholders (e.g., `NODE_ENV`, `PORT`).
- **Monorepo with multiple languages**: Apply language-specific patterns for ALL detected languages. Create separate sections in `.env.example`, `.gitignore`, and pre-commit hooks for each language.
- **Files already exist**: Always merge with existing content. Never overwrite without preserving current entries. Add new content in clearly commented sections.
- **Pre-commit not available**: If the project doesn't use Python and `pre-commit` would be an unusual dependency, use ecosystem-native alternatives (husky + lint-staged for Node.js, lefthook for Go, etc.).
- **CI/CD not present**: Skip Section 11 entirely. Note the absence in the summary report.

### Merging Strategy
When a file to be created or modified already exists:
1. Read the existing file content first
2. Preserve all existing entries and configurations
3. Add new content in clearly labeled sections with comments (e.g., `# Added by OnboardCopilot`)
4. Remove exact duplicates but keep the existing version if formatting differs
5. For `.vscode/settings.json`, merge keys — never overwrite existing user/team preferences

## 1. Codebase Analysis

Analyze and document the following:
- Primary programming languages and their versions
- Frameworks and libraries in use (with versions)
- Testing tools, frameworks, and test patterns
- Build systems and package managers (npm, pip, maven, cargo, etc.)
- CI/CD configuration files and workflows
- Code style tools (linters, formatters)
- Dependency management approach
- Project structure and architecture patterns
- Containerization setup (Dockerfile, docker-compose.yml, .devcontainer/)
- Monorepo tooling (lerna, pnpm workspaces, nx, turborepo)
- License files and type

## 2. Documentation Structure

Create the following directories if they don't exist:

### docs/architecture/
- Purpose: High-level architecture overviews, system diagrams, data flow documentation
- Store information about how the system is structured and component interactions
- Update when overall system design changes significantly

### docs/adr/ (Architecture Decision Records)
- Purpose: Numbered decision records documenting significant architectural choices
- Naming convention: `NNNN-short-title.md` (e.g., `0001-use-postgresql.md`)
- ADRs are append-only and immutable—never delete or edit existing ADRs
- Each ADR must include:
  - **Status**: proposed, accepted, deprecated, superseded
  - **Context**: the problem, constraints, requirements
  - **Options considered**: alternatives with pros/cons
  - **Decision**: what was chosen and why
  - **Consequences**: trade-offs, implications, what this enables or costs
- Write an ADR when decisions affect structure, dependencies, non-functional requirements, interfaces, or construction techniques
- If a decision is later reversed, create a new ADR that supersedes the old one

### docs/context/
- Purpose: Exploratory research, planning session notes, working documentation
- Naming convention: `YYYY-MM-DD-topic-name.md`
- Each note should include:
  - **Summary**: key findings, 2-3 sentences
  - **Options/Findings**: detailed exploration
  - **Open Questions**: unresolved items
  - Optional: Transcript/Details section for verbose content
- Create `docs/context/index.md` that groups related notes and links to resulting ADRs
- These notes support ADRs but are more informal and exploratory

## 3. Environment Configuration

### .env.example Template
Scan the codebase for environment variable usage and create `.env.example`. If no environment variables are detected, create a minimal template with common placeholders and a note for the team to populate:

- Search for environment variable patterns:
  - JavaScript/Node: `process.env.VARIABLE_NAME`
  - Python: `os.getenv()`, `os.environ[]`
  - Ruby: `ENV['']`
  - Go: `os.Getenv()`
  - Java: `System.getenv()`
  - Shell scripts: `$VARIABLE_NAME`

- Create `.env.example` with:
  - All detected environment variables as empty or example values
  - Clear comments describing each variable's purpose
  - Required vs optional variables clearly marked
  - Example values showing expected format (e.g., `DATABASE_URL=postgresql://user:pass@localhost:5432/dbname`)
  - Security warning at the top: `# ⚠️ Never commit actual secrets to version control`
  
- Group related variables with section headers:
  ```
  # Database Configuration
  DATABASE_URL=
  DB_POOL_SIZE=10

  # API Keys
  OPENAI_API_KEY=
  STRIPE_API_KEY=

  # Feature Flags
  ENABLE_BETA_FEATURES=false
  ```

### .gitignore Enhancement
Analyze detected tech stack and update `.gitignore` with:

**Language-specific patterns:**
- Python: `__pycache__/`, `*.py[cod]`, `*.egg-info/`, `.pytest_cache/`, `venv/`, `.venv/`
- Node.js: `node_modules/`, `npm-debug.log*`, `yarn-error.log*`, `.npm/`, `dist/`, `build/`
- Java: `target/`, `*.class`, `*.jar`, `*.war`
- Go: `bin/`, `*.exe`, `vendor/`
- Rust: `target/`, `Cargo.lock` (for binaries)
- Ruby: `*.gem`, `.bundle/`, `vendor/bundle/`

**IDE/Editor files:**
- `.vscode/*` with exclusions for shared config:
  - `!.vscode/settings.json`
  - `!.vscode/extensions.json`
  - `!.vscode/launch.json` (if present)
- `.idea/`
- `*.swp`, `*.swo`, `*~`
- `.DS_Store`

**Environment and secrets:**
- `.env`
- `.env.local`
- `.env.*.local`
- `*.pem`
- `*.key`
- `secrets.yml`

**Build artifacts and logs:**
- `*.log`
- `logs/`
- Build output directories detected from build config

**OS files:**
- `.DS_Store`
- `Thumbs.db`
- `desktop.ini`

Preserve existing `.gitignore` entries, add comments for each section, and remove duplicates.

## 4. IDE Configuration

Create `.vscode/` directory with the following files:

### .vscode/extensions.json
Based on detected tech stack, recommend essential extensions:

**Core extensions:**
- GitHub Copilot (`github.copilot`)
- GitLens (`eamodio.gitlens`)

**Language-specific extensions:**
- Python: Python extension, Pylint, Black formatter
- JavaScript/TypeScript: ESLint, Prettier
- Java: Extension Pack for Java, Spring Boot tools
- Go: Go extension
- Rust: rust-analyzer
- Ruby: Ruby extension, Solargraph

**Framework-specific tools:**
- React: ES7+ React snippets
- Vue: Volar
- Angular: Angular Language Service
- Django: Django template support

**Testing frameworks:**
- Jest, Pytest, JUnit extensions as appropriate

Example format:
```json
{
  "recommendations": [
    "github.copilot",
    "eamodio.gitlens",
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode"
  ]
}
```

### .vscode/settings.json
Configure workspace settings for consistency:

**Formatter configuration:**
- `"editor.formatOnSave": true`
- Set default formatter based on language (Prettier, Black, rustfmt, etc.)

**Linter configuration:**
- Enable linters detected in the project
- Configure lint-on-save if appropriate

**Language-specific settings:**
- Python: Set Python path, enable type checking
- JavaScript/TypeScript: Configure module resolution
- Set appropriate tab size based on existing code patterns

**File associations:**
- Map uncommon file extensions to correct languages

**Editor preferences:**
- Line endings (LF vs CRLF based on existing files)
- Trim trailing whitespace
- Insert final newline

Example format:
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "files.trimTrailingWhitespace": true,
  "files.insertFinalNewline": true
}
```

## 5. GitHub Templates

### .github/ISSUE_TEMPLATE/bug_report.md
```markdown
---
name: Bug Report
about: Report a bug or unexpected behavior
title: '[BUG] '
labels: bug
---

## Description
A clear and concise description of the bug.

## Steps to Reproduce
1. 
2. 
3. 

## Expected Behavior
What you expected to happen.

## Actual Behavior
What actually happened.

## Environment
- OS: 
- Browser/Runtime version: 
- Project version/commit: 

## Additional Context
Add any other context, screenshots, or logs.
```

### .github/ISSUE_TEMPLATE/feature_request.md
```markdown
---
name: Feature Request
about: Suggest a new feature or enhancement
title: '[FEATURE] '
labels: enhancement
---

## Problem Statement
Describe the problem or need this feature would address.

## Proposed Solution
Describe your proposed solution or feature.

## Alternatives Considered
What alternatives have you considered?

## Use Case
Describe specific use cases for this feature.

## Acceptance Criteria
- [ ] 
- [ ] 
- [ ] 

## Additional Context
Add any other context, mockups, or examples.
```

### .github/PULL_REQUEST_TEMPLATE.md
```markdown
## Description
Brief description of the changes in this PR.

## Type of Change
- [ ] Bug fix (non-breaking change fixing an issue)
- [ ] New feature (non-breaking change adding functionality)
- [ ] Breaking change (fix or feature causing existing functionality to break)
- [ ] Documentation update
- [ ] Refactoring (no functional changes)
- [ ] Performance improvement
- [ ] Dependency update

## Related Issues
Closes #
Related to #

## Changes Made
- 
- 
- 

## Testing Performed
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Manual testing completed
- [ ] All tests passing locally

Describe specific test scenarios:
- 
- 

## Documentation
- [ ] README updated (if applicable)
- [ ] API documentation updated (if applicable)
- [ ] Architecture docs updated (if applicable)
- [ ] ADR created (if architectural decision made)

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] No new warnings generated
- [ ] Dependent changes merged and published
- [ ] No secrets or sensitive data committed

## Screenshots (if applicable)

## Additional Notes
```

## 6. CODEOWNERS File

Create `.github/CODEOWNERS`:

> **Skip condition**: If the repository has no git history or is newly initialized, create a placeholder CODEOWNERS with `# TODO: Populate with actual team members` comments and skip git history analysis.

- Analyze git history to identify primary contributors per directory
- Use `git log --format='%an' --numstat` to find who modifies which areas
- Create initial CODEOWNERS mapping:
  ```
  # Default owners for everything
  * @owner-username

  # Documentation
  /docs/ @documentation-team

  # Specific directories based on git history analysis
  /src/frontend/ @frontend-leads
  /src/backend/ @backend-leads
  /tests/ @qa-leads
  
  # Configuration files
  /.github/ @devops-team
  ```

- If unable to determine ownership from git history, create a basic template with placeholders and notes for manual review

## 7. Pre-commit Hooks Configuration

Create `.pre-commit-config.yaml` based on detected languages:

**Universal hooks:**
- Trailing whitespace removal
- End-of-file fixer
- Check for merge conflicts
- Check for large files
- Prevent commit of secrets (using detect-secrets or similar)

**Language-specific hooks:**
- Python: black, isort, flake8, mypy
- JavaScript/TypeScript: prettier, eslint
- Go: gofmt, golint
- Rust: rustfmt, clippy
- Ruby: rubocop

When generating this file, look up the latest stable release tags for each repository. Do not hardcode versions — they become outdated quickly.

Example format:
```yaml
# IMPORTANT: Replace rev values with latest stable release tags before committing.
repos:
  - repo: https://github.com/pre-commit/pre-commit-hooks
    rev: # latest from https://github.com/pre-commit/pre-commit-hooks/releases
    hooks:
      - id: trailing-whitespace
      - id: end-of-file-fixer
      - id: check-merge-conflict
      - id: check-added-large-files
      
  - repo: https://github.com/Yelp/detect-secrets
    rev: # latest from https://github.com/Yelp/detect-secrets/releases
    hooks:
      - id: detect-secrets

  # Language-specific hooks based on detection
```

Keep hooks fast (< 2 seconds total) to avoid developer friction.

> **Alternative for Node.js projects**: If the project is Node.js-based and doesn't use Python, use `husky` + `lint-staged` instead of `pre-commit`. For Go projects, consider `lefthook`. Always match the hook tool to the project's ecosystem.

## 8. Custom Instructions

Create or update `.github/copilot-instructions.md`:

```markdown
# Project-Specific Guidelines for GitHub Copilot

## Project Overview
[Auto-generated based on codebase analysis]
- Primary language(s): 
- Framework(s): 
- Architecture pattern: 

## Coding Standards

### Language & Framework Versions
[List detected versions of key dependencies]

### Code Style
[Document observed patterns:]
- Naming conventions (camelCase, snake_case, PascalCase)
- File organization patterns
- Import/module structure
- Error handling patterns
- Testing patterns observed

### Testing Conventions
- Test file naming: 
- Test framework: 
- Coverage expectations: 
- Mocking approach: 

## Documentation Structure

This repository follows a structured documentation approach:

### docs/architecture/
High-level architecture overviews, system diagrams, and data flow documentation. Update when overall system design changes significantly.

### docs/adr/ (Architecture Decision Records)
Architecture Decision Records documenting significant architectural choices. Files are named `NNNN-short-title.md` (e.g., `0001-use-postgresql.md`). ADRs are immutable and append-only.

**Each ADR must include:**
- Status (proposed, accepted, deprecated, superseded)
- Context (problem, constraints, requirements)
- Options considered (alternatives with pros/cons)
- Decision (what was chosen and why)
- Consequences (trade-offs, implications)

Write an ADR when decisions affect structure, dependencies, non-functional requirements, interfaces, or construction techniques.

### docs/context/
Exploratory research, planning session notes, and working documentation. Files named `YYYY-MM-DD-topic-name.md` with Summary, Options/Findings, and Open Questions sections. Maintain an `index.md` linking related notes to resulting ADRs.

## Information Sources Priority

### 1. Primary: Documentation Lookup Tools
- **Use available documentation lookup tools** (e.g., Context7 MCP server, library documentation fetchers) for all technical documentation lookups when available
- Look up:
  - Library and framework documentation
  - API references
  - Language features and syntax
  - Best practices for current versions
- If no documentation tools are configured, proceed to first-party sources below

### 2. Secondary: First-Party Official Documentation
Use first-party official documentation sources (especially if documentation tools above are unavailable):
- learn.microsoft.com for Microsoft technologies
- Official GitHub repositories and documentation sites
- Vendor-maintained documentation portals
- Language specification documents

### 3. Never Rely Solely on Training Data
- Do not use potentially outdated training data for:
  - Current library versions
  - Recent framework features
  - Breaking changes in newer versions
  - Deprecated APIs or patterns
- Always verify current best practices with official sources

## Security Guidelines

### Critical Requirements
- **Never commit secrets, credentials, API keys, or tokens** to the repository
- Always use environment variables for sensitive configuration
- Validate and sanitize all user input
- Use parameterized queries to prevent SQL injection
- Implement proper authentication and authorization
- Keep dependencies up to date with security patches

### Code Review Focus
- Input validation and sanitization
- Authentication and authorization checks
- Secure data handling (encryption, hashing)
- Error handling that doesn't leak sensitive information
- Dependency vulnerabilities

## Build & Deployment
[Document detected build and deployment patterns]
- Build command: 
- Test command: 
- Development server: 
- Production build: 

## When to Update Documentation

### Create or Update ADRs
- After significant design or architecture sessions
- When decisions affect structure, dependencies, or interfaces
- When adopting new technologies or patterns

### Create Context Notes
- After research or exploratory work
- During planning sessions
- When documenting "why" behind experiments

### Update Architecture Docs
- After refactors that change system structure
- When adding new major components or services
- When data flows or integrations change

## General Documentation Principles
- Keep files focused on one topic
- Use Markdown format for all documentation
- Link between documents (ADRs reference context notes, context notes link to ADRs)
- Documentation is version-controlled alongside code
- Never commit secrets, credentials, or sensitive PII to documentation folders
```

## 9. Custom Agents

Create specialized GitHub Copilot agents in the `.github/agents/` directory:

### .github/agents/research-agent.agent.md
```markdown
---
name: research-agent
description: Conducts technical research using context7 and first-party sources to gather accurate, up-to-date information
tools: ['read', 'search', 'web']
---

You are a technical research specialist. Your responsibilities:

- Always attempt to use context7 first by including "use context7" in your research process
- If context7 fails or is unavailable, search for first-party official documentation (learn.microsoft.com, official repos, vendor docs)
- Never rely on potentially outdated training data for library versions or recent features
- Document findings in docs/context/ using YYYY-MM-DD-topic-name.md format
- Include Summary (2-3 sentences), Options/Findings (detailed), and Open Questions sections
- Update docs/context/index.md to link new research notes
- Cite sources and note documentation versions/dates

Focus on accuracy and currency of information. Always verify technical details against official sources.
```

### .github/agents/code-reviewer.agent.md
```markdown
---
name: code-reviewer
description: Reviews code for quality, maintainability, security, and adherence to project standards
tools: ['read', 'search', 'usages']
---

You are a code review specialist. Your responsibilities:

- Review code for quality, readability, and maintainability
- Check adherence to project coding standards and patterns
- Identify potential bugs, edge cases, and error handling gaps
- Suggest performance improvements where applicable
- Verify test coverage for new functionality
- Check for proper documentation and comments
- Identify code smells and recommend refactoring opportunities
- DO NOT modify code—only provide feedback and suggestions
- Reference existing patterns in the codebase for consistency

Provide constructive, actionable feedback with specific examples and rationale.
```

### .github/agents/security-agent.agent.md
```markdown
---
name: security-agent
description: Analyzes code for security vulnerabilities, validates secure coding practices, and ensures compliance with security standards
tools: ['read', 'search', 'grep']
---

You are a security analysis specialist. Your responsibilities:

- Identify potential security vulnerabilities (injection attacks, XSS, CSRF, etc.)
- Check for proper input validation and sanitization
- Verify authentication and authorization implementations
- Review data handling for sensitive information (PII, credentials, tokens)
- Check for secure defaults and configuration
- Identify dependency vulnerabilities and outdated packages
- Verify secrets are not committed to the repository
- Ensure proper error handling that doesn't leak sensitive information
- Review API security and rate limiting
- Check for secure communication protocols (HTTPS, TLS)

CRITICAL: Never commit or suggest committing secrets, credentials, API keys, or sensitive PII. Always flag potential security issues with severity levels and remediation steps.
```

### .github/agents/documentation-agent.agent.md
```markdown
---
name: documentation-agent
description: Creates and maintains ADRs, architecture documentation, and context notes following project standards
tools: ['read', 'edit', 'search']
---

You are a documentation specialist. Your responsibilities:

- Create Architecture Decision Records (ADRs) in docs/adr/ when architectural decisions are made
- Name ADRs as NNNN-short-title.md (e.g., 0001-use-postgresql.md)
- Ensure each ADR includes: Status, Context, Options considered, Decision, and Consequences
- Update docs/architecture/ for system design changes
- Create context notes in docs/context/ for research and planning
- Maintain docs/context/index.md with links to related notes and ADRs
- Link between documents (ADRs reference context notes, context notes link to ADRs)
- Never edit or delete existing ADRs—create new superseding ADRs if decisions change
- Use Markdown format for all documentation
- Keep documentation focused, one topic per file

Ensure documentation is clear, comprehensive, and provides historical context for future developers.
```

## 10. README Enhancement

If `README.md` exists, enhance it with missing sections. If it doesn't exist, create a comprehensive one:

### Required Sections

**Project Description:**
- Clear description of what the project does
- Key features and capabilities

**Quick Start:**
```markdown
## Quick Start

### Prerequisites
- [Language/Runtime] version X.X
- [Required tools]

### Installation
1. Clone the repository
2. Install dependencies: `[command]`
3. Copy environment template: `cp .env.example .env`
4. Configure environment variables (see Configuration section)

### Running Locally
Development server: `[command]`
Application runs at: `http://localhost:[port]`

### Testing
Run tests: `[command]`
Run with coverage: `[command]`

### Building
Production build: `[command]`
```

**Configuration:**
- Link to `.env.example`
- Describe required vs optional environment variables
- External service dependencies

**Documentation:**
```markdown
## Documentation

- [Architecture Documentation](./docs/architecture/)
- [Architecture Decision Records](./docs/adr/)
- [Planning & Research Notes](./docs/context/)
```

**Contributing:**
- Link to PR template
- Link to issue templates
- Basic contribution guidelines

**License:**
- Include license information if present

## 11. CI/CD Pipeline Documentation

> **Skip condition**: If no CI/CD configuration exists (`.github/workflows/`, `.circleci/`, `.gitlab-ci.yml`, `Jenkinsfile`, etc.), skip this section and note the absence in the summary report.

If CI/CD configuration exists, create `docs/architecture/ci-cd-pipeline.md` documenting:

- **Overview**: Brief description of the CI/CD approach
- **Pipeline Stages**: For each stage (build, test, security/quality, deploy), document:
  - Trigger conditions
  - Actions performed
  - Success criteria
  - Typical duration (if determinable)
- **Deployment Environments**: For each environment (staging, production), document triggers, URLs, deployment method, and rollback procedures
- **Required Secrets/Environment Variables**: List all secrets and environment variables referenced in CI/CD config (names only, never values)
- **Troubleshooting**: Common failure scenarios and solutions based on the pipeline configuration
- **Maintenance**: How to update CI dependencies and modify pipeline configuration

## 12. Initial ADR

Create `docs/adr/0001-adopt-documentation-structure.md`:

```markdown
# ADR 0001: Adopt Structured Documentation Framework

## Status
Accepted

## Context
This repository lacked a systematic approach to documenting architectural decisions, system design, and technical research. This created several problems:

- New developers struggled to understand why certain technical choices were made
- Historical context for decisions was lost over time
- Architecture knowledge existed only in individual team members' heads
- Onboarding new team members required extensive verbal knowledge transfer
- Technical debt decisions were made without clear documentation of trade-offs

The team needed a lightweight but structured approach to:
1. Document significant architectural decisions with their context and rationale
2. Maintain high-level architecture documentation
3. Preserve research and exploratory work that informs decisions
4. Create a searchable knowledge base for the project

## Options Considered

### Option 1: Wiki-based documentation
**Pros:**
- Easy to edit
- Good search functionality
- Familiar to most developers

**Cons:**
- Often becomes outdated and unmaintained
- Separate from code repository
- No version control integration
- Difficult to enforce structure

### Option 2: Comprehensive formal documentation
**Pros:**
- Very detailed
- Professional appearance

**Cons:**
- High maintenance burden
- Slows down development
- Often ignored by developers
- Becomes outdated quickly

### Option 3: Structured documentation in repository (ADR + Architecture + Context)
**Pros:**
- Version-controlled alongside code
- Lightweight and focused
- ADRs provide historical decision context
- Easy to link code changes to decisions
- Low barrier to contribution

**Cons:**
- Requires discipline to maintain
- Less discoverable than a wiki
- Needs team buy-in

## Decision
Adopt a three-tier structured documentation framework within the repository:

1. **docs/adr/**: Architecture Decision Records for significant decisions
2. **docs/architecture/**: High-level system design and component documentation
3. **docs/context/**: Research notes and exploratory documentation

This framework will be enforced through:
- Custom GitHub Copilot agents that encourage documentation
- PR templates that prompt for ADRs when appropriate
- Onboarding materials that explain the structure

## Consequences

### Positive
- Architectural decisions will have clear, searchable historical context
- New team members can understand "why" behind technical choices
- Documentation lives with the code and evolves together
- Low overhead compared to comprehensive documentation systems
- GitHub Copilot agents can reference this documentation to provide better context

### Negative
- Requires team discipline to create ADRs for significant decisions
- Initial learning curve for ADR format
- Risk of documentation becoming outdated if not maintained
- Need to establish what qualifies as "significant enough" for an ADR

### Mitigation Strategies
- Create custom GitHub Copilot agents to prompt for documentation
- Include ADR creation in PR checklist for architectural changes
- Conduct periodic reviews of documentation during retrospectives
- Keep ADR format simple and template-based to reduce friction
```

## 13. Security Baseline Report

Create `docs/context/[YYYY-MM-DD]-security-baseline.md`:

Perform initial security assessment:

**Dependency Analysis:**
- Scan dependency manifest files
- List direct and transitive dependencies with versions
- Identify dependencies without pinned versions

**Known Vulnerabilities:**
- Run language-specific audit commands when available:
  - Node.js: `npm audit` or `yarn audit`
  - Python: `pip audit` or `safety check`
  - Ruby: `bundle audit`
  - Rust: `cargo audit`
  - Go: `govulncheck ./...`
- Check for `dependabot.yml` or `renovate.json` presence
- Flag dependencies without lockfiles (lockfiles ensure reproducible builds and auditability)
- Prioritize findings by severity (Critical, High, Medium, Low)
- Identify outdated dependencies with security patches available

**Secrets Detection:**
- Scan codebase for patterns matching API keys, tokens, credentials
- Verify `.gitignore` includes secret file patterns
- Check for hard-coded passwords or keys

**Security Configuration:**
- Review security-related configuration
- Check CI/CD for security scanning
- Verify HTTPS/TLS usage

Format the report as:
```markdown
# Security Baseline Report
*Generated: [Date]*

## Summary
[2-3 sentence overview of security posture]

## Critical Findings
[List critical/high-severity issues requiring immediate attention]

## Dependency Inventory
- Total dependencies: [count]
- Dependencies with known vulnerabilities: [count]
- Outdated dependencies (>1 year): [count]

## Detailed Findings

### Known Vulnerabilities
[List CVEs with severity and affected components]

### Configuration Issues
[List security configuration concerns]

### Secrets & Credentials
[Report any detected secrets - DO NOT include actual values]

## Recommendations
1. [Prioritized list of security improvements]
2. 
3. 

## Open Questions
[Unresolved security concerns for team discussion]
```

## 14. Summary Report

Create `docs/context/[YYYY-MM-DD]-onboarding-report.md`:

```markdown
# Repository Onboarding Report
*Generated: [Date]*

## Executive Summary
This repository has been automatically analyzed and configured with development best practices, documentation structure, GitHub Copilot custom instructions, and specialized agents.

## Technologies Detected

### Languages & Versions
- 

### Frameworks & Libraries
- 

### Testing Tools
- 

### Build & CI/CD
- 

## Files & Directories Created

### Documentation Structure
- [ ] `docs/architecture/` - System design documentation
- [ ] `docs/adr/` - Architecture Decision Records
- [ ] `docs/context/` - Research and planning notes
- [ ] `docs/adr/0001-adopt-documentation-structure.md` - Initial ADR
- [ ] `docs/context/index.md` - Context notes index

### Development Environment
- [ ] `.env.example` - Environment variable template
- [ ] `.gitignore` - Enhanced with tech-stack patterns
- [ ] `.vscode/extensions.json` - Recommended extensions
- [ ] `.vscode/settings.json` - Workspace settings
- [ ] `.pre-commit-config.yaml` - Pre-commit hooks

### GitHub Configuration
- [ ] `.github/copilot-instructions.md` - Custom Copilot instructions
- [ ] `.github/agents/research-agent.agent.md` - Technical research agent
- [ ] `.github/agents/code-reviewer.agent.md` - Code review agent
- [ ] `.github/agents/security-agent.agent.md` - Security analysis agent
- [ ] `.github/agents/documentation-agent.agent.md` - Documentation agent
- [ ] `.github/ISSUE_TEMPLATE/bug_report.md` - Bug report template
- [ ] `.github/ISSUE_TEMPLATE/feature_request.md` - Feature request template
- [ ] `.github/PULL_REQUEST_TEMPLATE.md` - PR template
- [ ] `.github/CODEOWNERS` - Code ownership mapping

### Documentation
- [ ] `README.md` - Enhanced with Quick Start and documentation links
- [ ] `docs/architecture/ci-cd-pipeline.md` - CI/CD documentation (if applicable)
- [ ] `docs/context/[date]-security-baseline.md` - Security assessment

## GitHub Copilot Configuration

- Custom instructions configured in `.github/copilot-instructions.md`
- Project-specific coding standards, documentation structure, and security guidelines included

### Custom Agents Available

This repository includes 4 specialized Copilot agents in `.github/agents/`:

1. **@research-agent** — Technical research using context7 and first-party sources
2. **@code-reviewer** — Code quality, standards adherence, and maintainability review
3. **@security-agent** — Security vulnerability analysis and secure coding validation
4. **@documentation-agent** — ADRs, architecture docs, and context note management

Review and customize the agent definitions and instructions to match your team's specific conventions.

## Recommended Next Steps

### Immediate Actions (Required)
1. **Configure Environment Variables**
   - Review `.env.example`
   - Create `.env` file with actual values
   - Ensure all required variables are set

2. **Review and Customize Templates**
   - Update `.github/CODEOWNERS` with actual team members
   - Customize issue/PR templates for your workflow
   - Review pre-commit hooks and enable/disable as needed

3. **Install Pre-commit Hooks**
   ```bash
   pip install pre-commit
   pre-commit install
   ```

4. **Review Security Baseline**
   - Address critical vulnerabilities identified
   - Update outdated dependencies
   - Review security recommendations

### Short-term (First Week)
1. **IDE Setup**
   - Install recommended extensions from `.vscode/extensions.json`
   - Verify workspace settings work for your team

2. **Review Custom Copilot Instructions & Agents**
   - Validate auto-detected coding standards in `.github/copilot-instructions.md`
   - Review agent definitions in `.github/agents/`
   - Add project-specific guidelines
   - Update version information if needed

3. **Test Agent Functionality**
   - Try each custom agent (e.g., `@research-agent`, `@code-reviewer`)
   - Verify agents produce useful, accurate output
   - Customize agent system prompts as needed

4. **Documentation Review**
   - Read initial ADR: `docs/adr/0001-adopt-documentation-structure.md`
   - Familiarize team with documentation structure
   - Plan first architecture documentation session

### Ongoing Maintenance
1. **Keep Dependencies Updated**
   - Run language-specific audit tools regularly (monthly recommended)
   - Review security advisories

2. **Document Decisions**
   - Create ADRs for architectural decisions
   - Maintain context notes for research
   - Update architecture docs when system changes

3. **Refine Templates**
   - Update PR/issue templates based on team feedback
   - Extend Copilot instructions and agents as project needs evolve

## Security Considerations

⚠️ **Important Security Reminders:**
- Never commit `.env` files or actual secrets
- Review security baseline report: `docs/context/[date]-security-baseline.md`
- Address critical vulnerabilities before production deployment
- Enable pre-commit hooks to prevent accidental secret commits

## Questions or Issues?

- Review documentation in `docs/`
- Use custom Copilot agents for help (e.g., `@documentation-agent` for doc questions, `@security-agent` for security reviews)
- Reference `.github/copilot-instructions.md` for project conventions
- Create an issue using the templates in `.github/ISSUE_TEMPLATE/`

***

**Onboarding Complete!** Your repository is now configured with development best practices, GitHub Copilot custom instructions, and specialized agents.
```

---

## Execution Instructions

Execute all tasks in the order listed above. For each task:
1. **Check applicability**: Evaluate whether the section applies to this repository (see General Guidance above)
2. **Check for existing files**: Read existing files before creating or modifying — never overwrite without merging
3. **Preserve existing content**: When enhancing files, keep all existing entries and add new content in labeled sections
4. **Use consistent formatting and style**: Match the existing codebase conventions where possible
5. **Add clear comments**: Explain generated content with comments (e.g., `# Added by OnboardCopilot`)
6. **Create placeholder values**: Where team-specific information is needed, use `# TODO:` prefixed comments
7. **Skip gracefully**: If a section cannot be completed (e.g., no git history for CODEOWNERS), note it in the summary report and move on

After completing all tasks, provide a summary of:
- What was created
- What was modified
- What requires manual review/configuration
- Any warnings or important notes

**Generate the complete onboarding summary report as the final step.**
```