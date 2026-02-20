````markdown
# 🤖 Agents

Reusable GitHub Copilot agent files for specialized workflows.

## How to use agent files

**Install**
- Click the install button for VS Code or VS Code Insiders.
- Confirm the destination when VS Code asks where to save the agent.

**Run**
- Open Chat and switch to Agent mode.
- Select `prompt-engineer` or `copilot-engineer` as the active agent.
- If your client supports direct mentions, use `@prompt-engineer` or `@copilot-engineer` in chat.

## Onboarding tags

Agent files support onboarding tags via an inline metadata comment near the top of each file.

- Canonical source for onboarding is root `agents/*.agent.md`.
- Use format: `<!-- onboarding-tags: onboarding-core, <other-tag> -->`.
- Agents with `onboarding-tags` containing `onboarding-core` are mandatory for onboarding flows.
- Onboarding prompts should download these artifacts using canonical raw GitHub URLs and install them into target `.github/agents/`.
- To add a new default onboarding agent, add `onboarding-core` to its `onboarding-tags` metadata comment.

## Agent catalog

---

### [prompt-engineer.agent.md](./prompt-engineer.agent.md)

Creates and improves custom GitHub Copilot prompts using first-party best practices from Microsoft, GitHub, OpenAI, and Anthropic.

**Install**

[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect?url=vscode%3Achat-agent%2Finstall%3Furl%3Dhttps%3A%2F%2Fraw.githubusercontent.com%2FNoahJenkins%2FCopilot-Stuff%2Fmain%2Fagents%2Fprompt-engineer.agent.md) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect?url=vscode-insiders%3Achat-agent%2Finstall%3Furl%3Dhttps%3A%2F%2Fraw.githubusercontent.com%2FNoahJenkins%2FCopilot-Stuff%2Fmain%2Fagents%2Fprompt-engineer.agent.md)

**Raw URL**
```
https://raw.githubusercontent.com/NoahJenkins/Copilot-Stuff/main/agents/prompt-engineer.agent.md
```

---

### [copilot-engineer.agent.md](./copilot-engineer.agent.md)

Designs and maintains GitHub Copilot agents, prompts, and custom instructions using first-party best practices from Microsoft, GitHub, OpenAI, and Anthropic.

**Install**

[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect?url=vscode%3Achat-agent%2Finstall%3Furl%3Dhttps%3A%2F%2Fraw.githubusercontent.com%2FNoahJenkins%2FCopilot-Stuff%2Fmain%2Fagents%2Fcopilot-engineer.agent.md) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect?url=vscode-insiders%3Achat-agent%2Finstall%3Furl%3Dhttps%3A%2F%2Fraw.githubusercontent.com%2FNoahJenkins%2FCopilot-Stuff%2Fmain%2Fagents%2Fcopilot-engineer.agent.md)

**Raw URL**
```
https://raw.githubusercontent.com/NoahJenkins/Copilot-Stuff/main/agents/copilot-engineer.agent.md
```

````
