# Agent Orchestration Instructions

**Date:** 2026-02-20

## Context
To improve task delegation and ensure high-quality, specialized outputs, we needed to explicitly define how and when to use the specialized agents located in the `.github/agents/` directory.

## Changes
- Added an `Agent Orchestration` section to `.github/copilot-instructions.md`.
- Defined the specific use cases for the four core agents:
  - `@copilot-engineer`: For designing, building, and maintaining GitHub Copilot artifacts.
  - `@documentation-specialist`: For creating and maintaining ADRs, architecture documentation, context notes, and README updates.
  - `@prompt-engineer`: For creating, reviewing, and optimizing custom GitHub Copilot prompts.
  - `@research-agent`: For conducting technical research, gathering context, and analyzing information.
- Instructed Copilot to delegate tasks to these agents when a request falls within their specific domain.
