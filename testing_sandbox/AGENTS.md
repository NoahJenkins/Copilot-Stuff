# DFW Cloud Devs Website — AI Agent Instructions

## Project Overview
- Language: TypeScript 5 (strict mode)
- Framework: Next.js 16 App Router, React 19
- Styling: Tailwind CSS 4 with `cn()` utility (clsx + tailwind-merge)
- Animations: framer-motion
- Package manager: pnpm 10
- Architecture: Single-page app with feature-based components under `app/components/`

## Coding Standards

### Style
- Naming: `PascalCase` for components/types, `camelCase` for functions/variables, `UPPER_SNAKE_CASE` for constants
- Files: `PascalCase.tsx` for components, `camelCase.ts` for utilities and lib modules
- Imports: external libraries first, then internal (`../lib/`, `../components/`)
- `'use client'` directive required for client components using hooks/animations
- Default exports for components; named exports for utilities and types
- Error handling: typed TypeScript errors; surface user-facing errors as UI state
- Async: `async/await` preferred over promise chains

### Testing
- Framework: # TODO — not yet installed (Vitest or Jest recommended)
- File naming: # TODO — co-located `*.test.ts` preferred
- Mocking: # TODO

### API/Interface Conventions
- Environment variables: `NEXT_PUBLIC_*` for client-exposed values; never hard-code secrets
- Constants: centralized in `app/lib/constants.ts`

## Build & Development
- Build: `pnpm build`
- Dev server: `pnpm dev`
- Lint: `pnpm lint`
- Test: # TODO (no test runner configured yet)

## Security
- Never commit secrets, credentials, API keys, or tokens
- Use `NEXT_PUBLIC_*` env vars for client-side config; keep server secrets server-only
- Validate and sanitize all user input
- Keep dependencies patched — `pnpm audit` must pass with 0 vulnerabilities

## Documentation Update Policy
For non-trivial changes, update docs in the same turn without asking:
- `docs/TODO.md` — update task tracker
- `docs/adr/` — create ADR for architectural decisions
- `docs/context/` — add dated research/planning notes; update `docs/context/index.md`
- `docs/architecture/` — update for system design changes
- `docs/researchReports/` — add formal research findings
See `docs/AGENTS.md` for formats and triggers. A task is incomplete until docs are updated.

## Information Sources
1. **Documentation tools** (Context7 MCP, library fetchers) — use when available
2. **First-party official docs** — nextjs.org, react.dev, tailwindcss.com, learn.microsoft.com
3. **Never rely on training data alone** for current versions, deprecations, or breaking changes

## Sub-Agent Delegation
- `@research-agent` — technical research, dependency lookups, codebase analysis
- `@code-reviewer` — code quality, standards adherence, maintainability
- `@security-specialist` — vulnerability analysis, dependency audits, secure coding review
- `@documentation-specialist` — ADRs, architecture docs, context and research notes
- `@frontend-specialist` — frontend architecture, component design, Tailwind/Next.js patterns, accessibility
See `.github/agents/` for full agent definitions.
