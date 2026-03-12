# Codebase Analysis (Brownfield)

## Summary
The repository is a brownfield Next.js website project implemented with TypeScript and React. It uses pnpm as the preferred package manager (with both pnpm and npm lockfiles present), ESLint for static analysis, and Tailwind CSS v4 for styling. There is no CI/CD configuration, test suite, or container setup currently tracked in the repository.

## Options/Findings

### Languages & Runtime Tooling
- TypeScript (`^5.9.3`), JavaScript/JSX in build tooling
- Node.js ecosystem (`package.json` scripts and dependencies)

### Frameworks & Libraries
- Next.js `16.1.6`
- React `19.2.3`, React DOM `19.2.3`
- `framer-motion`, `next-themes`, `react-icons`, `clsx`, `tailwind-merge`, `tailwindcss-animate`

### Build, Lint, and Package Management
- Package manager: pnpm (`packageManager: pnpm@10.11.1`)
- Build scripts:
  - `pnpm dev`
  - `pnpm build`
  - `pnpm start`
  - `pnpm lint`
- Linting: ESLint 9 with `eslint-config-next`

### Testing
- No test framework detected
- No `*.test.*`/`*.spec.*` files detected

### CI/CD and Infrastructure
- No CI workflows (`.github/workflows/`) detected
- No `.circleci`, `.gitlab-ci.yml`, `Jenkinsfile` detected
- No Dockerfile / docker-compose / `.devcontainer` detected

### Project Structure
- App Router layout under `app/`
- Component-driven sections under `app/components/`
- Runtime app constants under `app/lib/constants.ts`
- Environment usage detected in `app/lib/constants.ts` via `process.env.NEXT_PUBLIC_*`

### Dependency Management Approach
- Both `pnpm-lock.yaml` and `package-lock.json` exist
- Dependency versions are mostly pinned via caret ranges

### License
- MIT License (`LICENSE`)

## Open Questions
- Should the project standardize on one lockfile/package manager (pnpm-only vs dual support)?
- Should CI be added for lint/build verification on pull requests?
- Should a test runner (e.g., Vitest/Playwright) be introduced for baseline quality gates?
