# Architecture Documentation

This directory contains high-level architecture overviews, system diagrams, and data flow documentation.

## Guidance
- Update these documents when overall system design changes significantly.
- Link related decisions from `docs/adr/`.
- Link supporting research from `docs/context/`.

## Testing Workflow Architecture

- Artifact validation is executed against `testing_sandbox/` as the dedicated local test bed.
- Workflow orchestration is defined in `.github/skills/test-artifact/SKILL.md`.
- Test outputs are documented in `docs/testingResults/` as dated markdown reports.
- Decision record: `docs/adr/0006-test-artifact-skill-over-agents-md.md`.
