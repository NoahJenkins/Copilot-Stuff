---
description: Security requirements for API routes, middleware, and data access code.
applyTo: 'src/app/api/**, src/lib/**, src/middleware*'
---

## Secrets & Environment Variables
- Never commit secrets, credentials, API keys, or tokens to the repository.
- Always use environment variables for sensitive configuration; reference `.env.example` for required names.

## Input Validation & Injection
- Validate and sanitize all user-controlled input at the boundary (API routes, form handlers).
- Use parameterized queries or an ORM — never string-concatenated SQL.
- Encode output to prevent XSS; apply Content Security Policy headers where applicable.

## Authentication & Authorization
- Verify authentication and authorization on every protected route — never trust client-side checks alone.
- Apply the principle of least privilege for service accounts and database roles.

## Error Handling
- Return generic error messages to clients; log full details server-side only.
- Do not expose stack traces, internal paths, or dependency versions in error responses.

## Dependency & Supply Chain
- Keep dependencies up to date with security patches.
- When adding a new dependency, prefer well-maintained packages with known provenance.
- Run the language audit tool (e.g., `npm audit` / `pip audit` / `cargo audit`) before merging dependency changes.
