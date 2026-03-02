---
description: Test file conventions, framework choices, and coverage expectations.
applyTo: '**/*.test.*, **/*.spec.*, **/__tests__/**, **/tests/**'
---

## Test Framework & Runner
- Framework: [e.g., Jest, Vitest, pytest, go test — fill in for your project]
- E2E / integration: [e.g., Playwright, Cypress, Supertest — omit if none]
- Run command: `[fill in]`
- Coverage command: `[fill in]`

## File Naming & Location
- Unit/integration tests: [e.g., `*.test.ts` co-located with source]
- E2E tests: [e.g., `tests/*.spec.ts`]

## Coverage Expectations
- Minimum threshold: [fill in or omit if none enforced]
- New code must include tests for happy path, error cases, and edge cases.

## Mocking & Test Data
- Mocking approach: [e.g., jest.mock(), unittest.mock, testify/mock — fill in for your project]
- Avoid testing implementation details; test observable behavior.
- Isolate external dependencies (HTTP, database, filesystem) in unit tests.
