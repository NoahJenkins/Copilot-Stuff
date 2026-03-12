# DFW Cloud Devs Website

A community website for DFW Cloud Devs built with Next.js App Router and React.

## Project Description

This site provides a central home for the DFW Cloud Devs community, including:
- Community-focused landing page sections (`About`, `What We Do`, `Community`, `Events`, `Connect`)
- Social and event links with safe fallback values
- Responsive UI built with Tailwind CSS and modern React components

## Quick Start

### Prerequisites
- Node.js 20+
- pnpm 10+

### Installation
1. Clone the repository
2. Install dependencies: `pnpm install`
3. This repository is pnpm-only (`pnpm-lock.yaml` is the canonical lockfile)
4. No `.env.example` is currently generated because no local `.env` file exists in this repo
5. Configure optional environment variables (see Configuration section)

### Running Locally
Development server: `pnpm dev`

Application runs at: `http://localhost:3000`

### Testing
Run tests: `# TODO: Add test framework and command`

Run with coverage: `# TODO: Add coverage command`

### Building
Production build: `pnpm build`

## Configuration

This project reads optional public environment variables for social/event links:
- `NEXT_PUBLIC_DISCORD_INVITE`
- `NEXT_PUBLIC_LUMA_CALENDAR_ID`
- `NEXT_PUBLIC_LINKEDIN_URL`
- `NEXT_PUBLIC_X_URL`

Required variables: none (fallback values are defined in `app/lib/constants.ts`).

Optional variables: all variables above (used to override defaults).

External dependencies:
- Public social platforms (Discord, Luma, LinkedIn, X)

## Documentation

- [Architecture Documentation](./docs/architecture/)
- [Architecture Decision Records](./docs/adr/)
- [Planning & Research Notes](./docs/context/)
- [Project Task Tracker](./docs/TODO.md)

## Contributing

- Use the PR template at `.github/PULL_REQUEST_TEMPLATE.md`
- Use issue templates in `.github/ISSUE_TEMPLATE/`
- Run lint checks before opening PRs: `pnpm lint`
- Optionally install pre-commit hooks:
  - `pip install pre-commit`
  - `pre-commit install`

## License

This project is licensed under the MIT License. See [LICENSE](./LICENSE).
