# Copilot Stuff

This repository contains reusable GitHub Copilot artifacts organized by type: prompts, agents, and instructions.

## Table of Contents

- [Prompts](./Prompts/README.md)
- [Agents](./Agents/README.md)
- [Instructions](./Instructions/README.md)

## Artifact Directories

- **Prompts**: [Prompts/README.md](./Prompts/README.md)
- **Agents**: [Agents/README.md](./Agents/README.md)
- **Instructions**: [Instructions/README.md](./Instructions/README.md)

Each directory README includes install buttons for every artifact in that category, with links for both VS Code and VS Code Insiders.

## Included Artifacts

### Prompts

- [onboard-copilot.prompt.md](./Prompts/onboard-copilot.prompt.md): Automated repository onboarding for greenfield and brownfield projects, including tech-stack detection/scaffolding and setup of instructions, docs, templates, and security baseline.

### Agents

- [frontend-agent.md](./Agents/frontend-agent.md): Specialized front-end build agent for responsive web/mobile UI that produces two design iterations, validates with Playwright MCP screenshots/tests, and follows the existing project stack.

### Instructions

- [sync-agents.instructions.md](./Instructions/sync-agents.instructions.md): Synchronizes GitHub Copilot instructions into `CLAUDE.md`, `GEMINI.md`, and `AGENTS.md` from `.github/copilot-instructions.md` as the source of truth.

---
*Created by [Noah Jenkins](https://github.com/NoahJenkins)*
