---
description: Automated repository onboarding that scans the repo and creates custom instructions, documentation structure, IDE configuration, and development environment setup
---

# OnboardCopilot: Automated Repository Setup

Scan this repository and perform the following comprehensive onboarding tasks:

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
Scan the codebase for environment variable usage and create `.env.example`:

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
- `.vscode/` (except settings you want to share)
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
***
name: Bug Report
about: Report a bug or unexpected behavior
title: '[BUG] '
labels: bug
***

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
***
name: Feature Request
about: Suggest a new feature or enhancement
title: '[FEATURE] '
labels: enhancement
***

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

Example format:
```yaml
repos:
  - repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v4.5.0
    hooks:
      - id: trailing-whitespace
      - id: end-of-file-fixer
      - id: check-merge-conflict
      - id: check-added-large-files
      
  - repo: https://github.com/Yelp/detect-secrets
    rev: v1.4.0
    hooks:
      - id: detect-secrets

  # Language-specific hooks based on detection
```

Keep hooks fast (< 2 seconds total) to avoid developer friction.

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

### 1. Primary: Context7
- **Always attempt to use context7 first** for all technical documentation lookups
- Include "use context7" in your research process when looking up:
  - Library and framework documentation
  - API references
  - Language features and syntax
  - Best practices for current versions
- Context7 provides up-to-date, accurate technical information from official sources

### 2. Secondary: First-Party Official Documentation
If context7 is unavailable or yields no results, use first-party official documentation sources:
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

## 9. README Enhancement

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

## 10. CI/CD Pipeline Documentation

If CI/CD configuration exists (`.github/workflows/`, `.circleci/`, `.gitlab-ci.yml`, etc.):

Create `docs/architecture/ci-cd-pipeline.md`:

```markdown
# CI/CD Pipeline Documentation

## Overview
[Brief description of the CI/CD approach]

## Pipeline Stages

### Build Stage
- Trigger: [when does it run]
- Actions:
  - Install dependencies
  - Compile/build application
  - Run linters/formatters
- Success criteria: Clean build with no errors
- Typical duration: [X minutes]

### Test Stage
- Trigger: [when does it run]
- Actions:
  - Run unit tests
  - Run integration tests
  - Generate coverage reports
- Success criteria: All tests pass, coverage threshold met
- Typical duration: [X minutes]

### Security/Quality Stage
- Actions:
  - Dependency vulnerability scanning
  - Static code analysis
  - Security scanning
- Success criteria: No critical vulnerabilities

### Deployment Stage(s)
[For each environment: staging, production, etc.]

#### Staging
- Trigger: [merge to main, manual, etc.]
- Environment: [staging URL/details]
- Deployment method: [describe]

#### Production
- Trigger: [tag, manual approval, etc.]
- Environment: [production URL/details]
- Deployment method: [describe]
- Rollback procedure: [describe]

## Required Secrets/Environment Variables

### Repository Secrets
[List secrets configured in CI/CD]
- `SECRET_NAME`: Description and where to obtain
- 

### Environment Variables
[List environment-specific variables]
- 

## Troubleshooting

### Common Issues

**Build fails on dependency installation**
- Solution: 

**Tests fail in CI but pass locally**
- Solution: 

**Deployment fails**
- Solution: 

## Pipeline Maintenance
- How to update dependencies in CI
- How to modify pipeline configuration
- Where to view logs and artifacts
```

## 11. Initial ADR

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

## 12. Security Baseline Report

Create `docs/context/[YYYY-MM-DD]-security-baseline.md`:

Perform initial security assessment:

**Dependency Analysis:**
- Scan dependency manifest files
- List direct and transitive dependencies with versions
- Identify dependencies without pinned versions

**Known Vulnerabilities:**
- Check for known CVEs using available data
- Prioritize by severity (Critical, High, Medium, Low)
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

## 13. Summary Report

Create `docs/context/[YYYY-MM-DD]-onboarding-report.md`:

```markdown
# Repository Onboarding Report
*Generated: [Date]*

## Executive Summary
This repository has been automatically analyzed and configured with development best practices, documentation structure, and GitHub Copilot custom agents.

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
- [ ] `.github/ISSUE_TEMPLATE/bug_report.md` - Bug report template
- [ ] `.github/ISSUE_TEMPLATE/feature_request.md` - Feature request template
- [ ] `.github/PULL_REQUEST_TEMPLATE.md` - PR template
- [ ] `.github/CODEOWNERS` - Code ownership mapping

### Documentation
- [ ] `README.md` - Enhanced with Quick Start and documentation links
- [ ] `docs/architecture/ci-cd-pipeline.md` - CI/CD documentation (if applicable)
- [ ] `docs/context/[date]-security-baseline.md` - Security assessment

## Custom Copilot Agents Available

This repository has 7 custom agents configured in `.github/agents/`:

1. **research-agent** (Gemini 3 Flash) - Technical research with context7
2. **code-reviewer** (Claude Sonnet 4.5) - Code quality and standards
3. **security-agent** (Claude Opus 4.6) - Security analysis and vulnerabilities
4. **documentation-agent** (GPT-5.2) - ADRs, architecture docs, README
5. **implementation-planner** (Claude Opus 4.6) - Technical planning
6. **test-specialist** (GPT-5.1-Codex-Max) - Test creation and coverage
7. **dependency-manager** (GPT-5.1-Codex-Max) - Dependency updates and maintenance

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
1. **Review Custom Copilot Instructions**
   - Validate auto-detected coding standards
   - Add project-specific guidelines
   - Update version information if needed

2. **IDE Setup**
   - Install recommended extensions from `.vscode/extensions.json`
   - Verify workspace settings work for your team

3. **Documentation Review**
   - Read initial ADR: `docs/adr/0001-adopt-documentation-structure.md`
   - Familiarize team with documentation structure
   - Plan first architecture documentation session

4. **Test Agent Functionality**
   - Try each custom Copilot agent
   - Provide feedback on agent performance
   - Adjust model assignments if needed

### Ongoing Maintenance
1. **Keep Dependencies Updated**
   - Use dependency-manager agent monthly
   - Review security advisories

2. **Document Decisions**
   - Create ADRs for architectural decisions
   - Maintain context notes for research
   - Update architecture docs when system changes

3. **Refine Templates**
   - Update PR/issue templates based on team feedback
   - Add custom agents as project needs evolve

## Security Considerations

⚠️ **Important Security Reminders:**
- Never commit `.env` files or actual secrets
- Review security baseline report: `docs/context/[date]-security-baseline.md`
- Address critical vulnerabilities before production deployment
- Enable pre-commit hooks to prevent accidental secret commits

## Questions or Issues?

- Review documentation in `docs/`
- Use custom Copilot agents for help (e.g., `@documentation-agent` for doc questions)
- Create an issue using the templates in `.github/ISSUE_TEMPLATE/`

***

**Onboarding Complete!** Your repository is now configured with development best practices and GitHub Copilot custom agents.
```

---

## Execution Instructions

Execute all tasks in the order listed above. For each task:
1. Analyze existing files/structure before creating new ones
2. Preserve existing content when enhancing files
3. Use consistent formatting and style
4. Add clear comments explaining generated content
5. Create placeholder values where team-specific information is needed

After completing all tasks, provide a summary of:
- What was created
- What was modified
- What requires manual review/configuration
- Any warnings or important notes

**Generate the complete onboarding summary report as the final step.**
```