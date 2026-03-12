# Testing Sandbox Instructions

This directory is the test bed for validating distributable artifacts from this repository.

## Purpose

- Use this sandbox to test prompts, agents, instructions, and skills against a realistic Next.js codebase.
- Keep testing changes focused on artifact behavior validation.

## Tech Context

- Next.js 16 + React 19 + TypeScript
- Tailwind CSS 4
- `pnpm` package manager

## Mutation Policy

- Allowed by default:
  - Sandbox agent/config files (for example `AGENTS.md`, `CLAUDE.md`, `.github/**`, `.claude/**`).
- Read-only by default:
  - Application/runtime files (`app/**`, `public/**`, `package.json`, `tsconfig.json`).
- If an artifact test requires app changes, keep edits minimal and document them in the test report.

## Workflow

- Follow `skills/test-artifact/SKILL.md` for the full end-to-end test procedure.
- Include `.instructions.md` testing by installing instructions into `testing_sandbox/.github/instructions/` when applicable.
- Publish results to `docs/testingResults/YYYY-MM-DD-<artifact-name>.md`.

## Optional Cleanup

After test runs that modify sandbox files, you may reset this directory:

```bash
git checkout testing_sandbox/
```