# DFW Cloud Devs Website — AI Agent Instructions

## Project Overview
- Language(s): TypeScript, TSX, CSS, Markdown, YAML
- Framework(s): Next.js 16 App Router, React 19, Tailwind CSS 4
- Architecture: Single-app frontend with `app/`, `app/components/`, `app/lib/`, and `docs/`
- Package manager: pnpm (`pnpm-lock.yaml` is canonical)

## Coding Standards

### Style
- Naming: PascalCase component files, camelCase variables/functions, UPPER_SNAKE_CASE exported constants
- Files: Next route files use `page.tsx` / `layout.tsx`; shared components use PascalCase filenames
- Imports: group external imports before local imports; keep CSS imports near the top of route/layout files
- Exports: default-export React components; use named exports for shared constants and utilities
- Error handling: prefer explicit safe fallbacks for optional public env values; `# TODO: Define shared error boundary pattern`
- Async: no strong async convention exists yet; current UI is mostly static and client interactivity uses local hooks
- Client components: add `'use client'` only when hooks, browser APIs, or interactive state are required

### Testing
- Framework: `# TODO: Define test framework`
- File naming: `# TODO: Define test file naming`
- Structure: no automated test suite is installed yet
- Mocking: `# TODO: Define mocking approach`

### API and Interface Conventions
- No backend or API route conventions are established yet in this repo
- Keep component props small and local; inline simple prop typing when it improves readability
- Centralize reusable config/constants in `app/lib/`

## Build and Development
- Build: `pnpm build`
- Test: `# TODO: Add test command`
- Lint: `pnpm lint`
- Dev server: `pnpm dev`

## Security
- Never commit secrets, credentials, API keys, or tokens
- Use environment variables for sensitive configuration and keep safe fallback values public-only
- Validate and sanitize any future user input before rendering or storage
- Keep pnpm lockfile updates and dependency audits current

## Documentation Update Policy
For non-trivial changes, update `docs/TODO.md`, relevant ADR/context/architecture docs, and any onboarding report in the same turn. See `docs/AGENTS.md` for triggers and formats.

## Information Sources
1. Documentation tools and repo docs
2. First-party vendor documentation
3. Never rely on training data alone for current versions or breaking changes

## Sub-Agent Delegation
- `@research-agent` — codebase analysis, dependency lookups, repo research
- `@code-reviewer` — standards, maintainability, and quality review
- `@security-specialist` — audits, secret handling, and vulnerability review
- `@documentation-specialist` — ADRs, architecture docs, context notes, and reports
- `@frontend-specialist` — UI architecture, accessibility, and frontend performance
