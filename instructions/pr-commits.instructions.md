---
description: Git commit format, branch naming, and pull request conventions.
applyTo: '**'
---

## Commit Messages
- Format: `<type>(<scope>): <short summary>` (e.g., `feat(auth): add OAuth2 login`)
- Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `ci`
- Keep the subject line under 72 characters; use the body for "why" when needed.
- Reference issues in the body or footer: `Closes #123`

## Branch Naming
- Pattern: `<type>/<short-description>` (e.g., `feat/user-profile`, `fix/login-redirect`)
- Use lowercase and hyphens; no spaces or underscores.

## Pull Request Expectations
- Title follows the same `<type>(<scope>): summary` format as commit messages.
- Description must include: what changed, why it changed, and how to test it.
- Link the PR to the relevant issue(s).
- Keep PRs focused — one logical change per PR where possible.

## Merge Strategy
- [Squash-and-merge to keep a linear history / merge commits to preserve branch history — fill in for your project]
- Do not merge with failing checks.
- Delete the branch after merge.
