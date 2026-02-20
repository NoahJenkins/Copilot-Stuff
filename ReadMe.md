# Copilot Stuff

This repository contains reusable GitHub Copilot artifacts organized by type: prompts, agents, instructions, and skill. These are tools I am using to extract more value and performance from github copilot (and other agents using the sync-agents skills). 

> Inspired by [github/awesome-copilot](https://github.com/github/awesome-copilot) — a fantastic community-driven collection of Copilot prompts, instructions, and tools. If you find this repo useful, you'll love that one too. Highly recommend checking it out (and contributing!).

## Contents

| Directory | README |
| :--- | :--- |
| Prompts | [docs/README.prompts.md](./docs/README.prompts.md) |
| Agents | [docs/README.agents.md](./docs/README.agents.md) |
| Skills | [docs/README.skills.md](./docs/README.skills.md) |

Each directory README includes artifact details and install instructions.

## Docs Structure

This repository now includes a lightweight documentation framework for architecture, decisions, and working notes:
- [docs/architecture/](./docs/architecture/) for system-level design documentation
- [docs/adr/](./docs/adr/) for Architecture Decision Records (ADRs)
- [docs/context/](./docs/context/) for dated research and planning notes
- [docs/TODO.md](./docs/TODO.md) for the living project task tracker

## Included Artifacts

### Prompts

- [onboard-copilot.prompt.md](./prompts/onboard-copilot.prompt.md): Onboards greenfield and brownfield repositories by setting up stack-aware docs, instructions, templates, and security defaults.

### Agents

- [agents/prompt-engineer.agent.md](./agents/prompt-engineer.agent.md): Specialized agent for creating and refining custom GitHub Copilot prompts using first-party prompt engineering best practices.
- [agents/copilot-engineer.agent.md](./agents/copilot-engineer.agent.md): Specialized agent for building and maintaining GitHub Copilot agents, prompts, and instructions using first-party best practices.

### Skills

- [skills/sync-agents/SKILL.md](./skills/sync-agents/SKILL.md): Syncs GitHub Copilot instructions, custom agents, and skills into Claude Code, Gemini CLI, and OpenAI Codex targets.
- [skills/sync-agentsv2/SKILL.md](./skills/sync-agentsv2/SKILL.md): Syncs GitHub Copilot instructions, custom agents, and skills to detected agent ecosystems using a detection-first flow.

## License

[MIT](./LICENSE) © 2026 Noah Jenkins

---
*Created by [Noah Jenkins](https://github.com/NoahJenkins)*
