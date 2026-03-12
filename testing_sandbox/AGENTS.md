# Project Guidelines — DFW Cloud Devs Website (Testing Sandbox)

## Project Overview

- **App**: DFW Cloud Devs community website · testing sandbox for AI artifacts
- **Stack**: Next.js 16 · React 19 · TypeScript 5.9 · Tailwind CSS 4
- **Package Manager**: pnpm 10 (strict; `pnpm-lock.yaml` is canonical)
- **Architecture**: Static frontend only — App Router, no API routes, no database

## Commands

| Task | Command |
|------|---------|
| Dev server | `pnpm dev` → http://localhost:3000 |
| Production build | `pnpm build` |
| Lint | `pnpm lint` |

## Coding Standards

- TypeScript strict mode — no `any`, no suppressed errors
- Tailwind CSS for all styling; no inline styles
- Components in `app/components/`, shared utilities in `app/lib/`
- Class merging: use `clsx` + `tailwind-merge` via `lib/utils.ts`
- Env vars via `process.env.NEXT_PUBLIC_*`; fallbacks in `app/lib/constants.ts`
- No testing framework configured yet — see `docs/TODO.md` Follow-ups

## Sandbox Mutation Policy

- **Allowed**: `AGENTS.md`, `CLAUDE.md`, `.github/**`, `.claude/**`, `docs/**`, `.vscode/**`
- **Read-only**: `app/**`, `public/**`, `package.json`, `tsconfig.json`
- If a test requires app changes, keep edits minimal and document in the test report
- Reset sandbox after test runs: `git checkout testing_sandbox/`
- Publish test results to `docs/testingResults/YYYY-MM-DD-<artifact-name>.md`

## Docs Update Policy

- Update `docs/TODO.md` when tasks change; refresh `Last Updated` date each time
- Create dated context notes for research: `docs/context/YYYY-MM-DD-topic.md`
- Create ADRs for architectural decisions: `docs/adr/NNNN-title.md`
- Update `docs/context/index.md` when adding new context notes
- See `docs/adr/0001-adopt-documentation-structure.md` for the full framework

## Security

- Never commit secrets, credentials, or API keys
- All sensitive config via environment variables
- Run `pnpm audit` before merging dependency changes
- Pre-commit hooks enforce linting and secret detection

## Sub-Agent Delegation

Specialists available in `.github/agents/`:

| Agent | Use for |
|-------|---------|
| `@code-reviewer` | Code quality, standards adherence |
| `@documentation-specialist` | ADRs, architecture docs, context notes |
| `@research-agent` | Technical research, version lookups |
| `@security-specialist` | Security review, vulnerability analysis |
| `@frontend-specialist` | UI/component architecture, accessibility |