# docs/AGENTS.md

## Scope
Documentation process for ADRs, context notes, architecture docs, research reports, and onboarding reports in this repository.

## ADR Rules
- Location: `docs/adr/`
- Naming: `NNNN-short-title.md`
- ADRs are append-only and immutable; never delete or rewrite an existing ADR
- Required sections: Status, Context, Options Considered, Decision, Consequences
- Write an ADR for structural changes, dependency additions, technology selections, interface design choices, or non-functional requirement decisions
- If a decision changes, create a new ADR that supersedes the old one

## Architecture Docs
- Location: `docs/architecture/`
- Update when system design changes, new components are added, or data flow changes
- Include purpose, current state, key design decisions, and Mermaid diagrams when useful

## Context Notes
- Location: `docs/context/`
- Naming: `YYYY-MM-DD-topic-name.md`
- Use for exploratory research, planning notes, investigations, and onboarding reports
- Standard context-note sections: Summary, Findings, Open Questions
- When a context note is created alongside an ADR, add `<!-- Related ADR: [ADR NNNN](../adr/NNNN-short-title.md) -->` at the bottom

## Research Reports
- Location: `docs/researchReports/`
- Naming: `YYYY-MM-DD-topic-name.md`
- Required sections: Purpose, Methodology, Findings, Recommendations, References
- Use when findings directly justify an architectural decision or formal recommendation

## Task Tracker
- File: `docs/TODO.md`
- Update the `Last Updated` date on every change
- Keep sections for active work, Blocked, Follow-ups, and Definition of Done current
- Add newly discovered tasks during execution and mark completed work immediately

## Agent Handoff Protocol
When delegating to a sub-agent, always provide:
- task objective and scope
- relevant file paths
- prior findings or earlier agent output
- expected output format

Escalation patterns:
- research findings that require a decision -> `@documentation-specialist` for ADR authoring
- code review findings with security impact -> `@security-specialist`
- architectural changes or onboarding refresh work -> `@documentation-specialist` for context note and ADR updates
