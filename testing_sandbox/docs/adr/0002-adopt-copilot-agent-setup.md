# ADR 0002: Adopt GitHub Copilot Agent Setup with Living Documentation

## Status
Accepted

## Context
This repository needed a systematic approach to:
1. Configure GitHub Copilot with accurate, repo-specific coding standards extracted from the
   actual codebase — not generic assumptions
2. Install and orchestrate specialized AI agents for research, review, security, and documentation
3. Establish a living documentation structure that stays in sync with code evolution

Without this setup, AI tooling operates on generic patterns misaligned with actual conventions,
documentation knowledge decays over time, and architectural decisions lose their rationale.

The repository was previously onboarded (2026-03-02, 2026-03-12) establishing docs structure
and security baselines. This ADR formalizes the adoption of the full agent-based setup.

## Options Considered

### Option 1: No custom configuration
**Pros:** Zero overhead
**Cons:** Copilot produces generic suggestions misaligned with actual patterns; no specialized agents

### Option 2: Custom instructions only (no agents, no docs structure)
**Pros:** Simple; low maintenance
**Cons:** Single AI context handles all concerns; no specialization; no decision trail

### Option 3: Custom instructions + specialized agents + living documentation
**Pros:**
- `AGENTS.md` grounded in real codebase conventions (TypeScript, Next.js 16, pnpm, Tailwind CSS 4)
- Specialized agents handle research, review, security, and documentation without context pollution
- Architectural decisions have traceable, searchable history in-repo
- `/sync-agents` propagates setup to Claude Code, Cursor, Windsurf, and other AI tools

**Cons:**
- Initial setup investment
- Team must maintain ADR discipline for significant decisions

## Decision
Adopt Option 3:
- `AGENTS.md` as universal instruction file (read natively by Copilot, Codex, Cursor, Gemini CLI, VS Code)
- Core agent suite: `@research-agent`, `@code-reviewer`, `@security-specialist`, `@documentation-specialist`
- Expanded agent: `@frontend-specialist` (installed — Next.js/React/Tailwind stack warrants it)
- Docs structure: `docs/adr/`, `docs/architecture/`, `docs/context/`, `docs/researchReports/`
- `/sync-agents` for ongoing propagation to all configured AI tools

## Consequences

### Positive
- Copilot suggestions align with actual codebase conventions (TypeScript strict, pnpm, Tailwind)
- Specialized agents handle concerns without polluting each other's context
- Architectural decisions have traceable, searchable history
- All AI tools in the workflow share the same project context via `/sync-agents`

### Negative
- Team must create ADRs for significant decisions (low friction, but requires discipline)
- Agent instructions need review as codebase evolves

### Mitigation
- `docs/AGENTS.md` provides documentation triggers and format templates
- PR template includes ADR checkbox for architectural changes
- `# TODO` placeholders in `AGENTS.md` for testing framework when adopted
