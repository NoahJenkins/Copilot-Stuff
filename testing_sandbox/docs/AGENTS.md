# docs/AGENTS.md

## Scope
Documentation process for ADRs, context notes, architecture docs, and research reports in this repository.

## ADR Rules
- Location: `docs/adr/` — naming: `NNNN-short-title.md`
- ADRs are append-only and immutable — never delete or edit an existing ADR
- Required sections: Status, Context, Options Considered, Decision, Consequences
- Write an ADR when: structural changes, dependency additions, non-functional requirement decisions, interface design choices, or technology selections are made
- If a decision is reversed: create a new ADR that supersedes the old one (do not edit)
- Before creating, list all files in `docs/adr/` and use the next sequential number

## Architecture Docs
- Location: `docs/architecture/`
- Update when: system design changes, new components added, data flow modified
- Each doc should include: purpose, current state, key design decisions, diagrams (Mermaid preferred)

## Context Notes
- Location: `docs/context/` — naming: `YYYY-MM-DD-topic-name.md`
- Informal and exploratory: research sessions, planning discussions, investigation summaries
- Required sections: Summary (2–3 sentences), Findings, Open Questions
- Always add a new entry to `docs/context/index.md` when creating a context note
- When a context note is created alongside an ADR, add `<!-- Related ADR: [ADR NNNN](../adr/NNNN-short-title.md) -->` at the bottom

## Research Reports
- Location: `docs/researchReports/` — naming: `YYYY-MM-DD-topic-name.md`
- Formal and reference-grade: technology evaluations, comparative analyses, spike results
- Required sections: Purpose, Methodology, Findings, Recommendations, References
- Use when findings directly justify an architectural decision or inform an ADR

## Task Tracker
- `docs/TODO.md` — living task tracker; update the `Last Updated` date on every change
- Sections: active work, Blocked (with dependency notes), Follow-ups, Definition of Done
- Add newly discovered tasks during execution; mark completed immediately

## Agent Handoff Protocol
When delegating to a sub-agent, always provide:
- Task objective and scope
- Relevant file paths from codebase analysis
- Prior findings (previous agent output, if any)
- Expected output format

Escalation patterns:
- Research findings that require decisions → `@documentation-specialist` creates ADR
- Code review findings with security impact → escalate to `@security-specialist`
- Any architectural change discovered → `@documentation-specialist` creates context note + ADR
