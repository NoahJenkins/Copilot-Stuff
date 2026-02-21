# Agents

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
- Agents with `onboarding-tags` containing `onboarding-expanded` are optional and should be installed only when repo/stack detection indicates relevance.
- Onboarding prompts should download these artifacts using canonical raw GitHub URLs and install them into target `.github/agents/`.
- To add a new default onboarding agent, add `onboarding-core` to its `onboarding-tags` metadata comment.
- To add an optional specialist onboarding agent, add `onboarding-expanded` with a capability tag (for example: `frontend`, `backend`, `data`, `devops`).

## Agent catalog

---

### [code-reviewer.agent.md](./code-reviewer.agent.md)

Reviews code for quality, maintainability, and adherence to project standards. Provides actionable feedback without modifying code.

**Install**

[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect?url=vscode%3Achat-agent%2Finstall%3Furl%3Dhttps%3A%2F%2Fraw.githubusercontent.com%2FNoahJenkins%2FCopilot-Stuff%2Fmain%2Fagents%2Fcode-reviewer.agent.md) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect?url=vscode-insiders%3Achat-agent%2Finstall%3Furl%3Dhttps%3A%2F%2Fraw.githubusercontent.com%2FNoahJenkins%2FCopilot-Stuff%2Fmain%2Fagents%2Fcode-reviewer.agent.md)

**Raw URL**
```
https://raw.githubusercontent.com/NoahJenkins/Copilot-Stuff/main/agents/code-reviewer.agent.md
```

---

### [security-specialist.agent.md](./security-specialist.agent.md)

Analyzes code and configuration for security vulnerabilities. Produces severity-graded findings with evidence and concrete remediation steps.

**Install**

[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect?url=vscode%3Achat-agent%2Finstall%3Furl%3Dhttps%3A%2F%2Fraw.githubusercontent.com%2FNoahJenkins%2FCopilot-Stuff%2Fmain%2Fagents%2Fsecurity-specialist.agent.md) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect?url=vscode-insiders%3Achat-agent%2Finstall%3Furl%3Dhttps%3A%2F%2Fraw.githubusercontent.com%2FNoahJenkins%2FCopilot-Stuff%2Fmain%2Fagents%2Fsecurity-specialist.agent.md)

**Raw URL**
```
https://raw.githubusercontent.com/NoahJenkins/Copilot-Stuff/main/agents/security-specialist.agent.md
```

---

### [research-agent.agent.md](./research-agent.agent.md)

Conducts technical research using official documentation sources to gather accurate, up-to-date information and produce structured findings for documentation.

**Install**

[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect?url=vscode%3Achat-agent%2Finstall%3Furl%3Dhttps%3A%2F%2Fraw.githubusercontent.com%2FNoahJenkins%2FCopilot-Stuff%2Fmain%2Fagents%2Fresearch-agent.agent.md) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect?url=vscode-insiders%3Achat-agent%2Finstall%3Furl%3Dhttps%3A%2F%2Fraw.githubusercontent.com%2FNoahJenkins%2FCopilot-Stuff%2Fmain%2Fagents%2Fresearch-agent.agent.md)

**Raw URL**
```
https://raw.githubusercontent.com/NoahJenkins/Copilot-Stuff/main/agents/research-agent.agent.md
```

---

### [documentation-specialist.agent.md](./documentation-specialist.agent.md)

Creates and maintains ADRs, architecture documentation, and context notes. Default owner for context-note creation and documentation indexing.

**Install**

[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect?url=vscode%3Achat-agent%2Finstall%3Furl%3Dhttps%3A%2F%2Fraw.githubusercontent.com%2FNoahJenkins%2FCopilot-Stuff%2Fmain%2Fagents%2Fdocumentation-specialist.agent.md) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect?url=vscode-insiders%3Achat-agent%2Finstall%3Furl%3Dhttps%3A%2F%2Fraw.githubusercontent.com%2FNoahJenkins%2FCopilot-Stuff%2Fmain%2Fagents%2Fdocumentation-specialist.agent.md)

**Raw URL**
```
https://raw.githubusercontent.com/NoahJenkins/Copilot-Stuff/main/agents/documentation-specialist.agent.md
```

---

### [frontend-specialist.agent.md](./frontend-specialist.agent.md)

Optional onboarding-expanded specialist for frontend architecture, accessibility, and performance guidance in UI-heavy repositories.

**Install**

[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect?url=vscode%3Achat-agent%2Finstall%3Furl%3Dhttps%3A%2F%2Fraw.githubusercontent.com%2FNoahJenkins%2FCopilot-Stuff%2Fmain%2Fagents%2Ffrontend-specialist.agent.md) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect?url=vscode-insiders%3Achat-agent%2Finstall%3Furl%3Dhttps%3A%2F%2Fraw.githubusercontent.com%2FNoahJenkins%2FCopilot-Stuff%2Fmain%2Fagents%2Ffrontend-specialist.agent.md)

**Raw URL**
```
https://raw.githubusercontent.com/NoahJenkins/Copilot-Stuff/main/agents/frontend-specialist.agent.md
```

---

### [backend-specialist.agent.md](./backend-specialist.agent.md)

Optional onboarding-expanded specialist for backend APIs, service reliability, and operational correctness in server-side repositories.

**Install**

[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect?url=vscode%3Achat-agent%2Finstall%3Furl%3Dhttps%3A%2F%2Fraw.githubusercontent.com%2FNoahJenkins%2FCopilot-Stuff%2Fmain%2Fagents%2Fbackend-specialist.agent.md) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect?url=vscode-insiders%3Achat-agent%2Finstall%3Furl%3Dhttps%3A%2F%2Fraw.githubusercontent.com%2FNoahJenkins%2FCopilot-Stuff%2Fmain%2Fagents%2Fbackend-specialist.agent.md)

**Raw URL**
```
https://raw.githubusercontent.com/NoahJenkins/Copilot-Stuff/main/agents/backend-specialist.agent.md
```

---

### [data-specialist.agent.md](./data-specialist.agent.md)

Optional onboarding-expanded specialist for data modeling, schema evolution, and persistence-layer reliability in data-intensive repositories.

**Install**

[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect?url=vscode%3Achat-agent%2Finstall%3Furl%3Dhttps%3A%2F%2Fraw.githubusercontent.com%2FNoahJenkins%2FCopilot-Stuff%2Fmain%2Fagents%2Fdata-specialist.agent.md) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect?url=vscode-insiders%3Achat-agent%2Finstall%3Furl%3Dhttps%3A%2F%2Fraw.githubusercontent.com%2FNoahJenkins%2FCopilot-Stuff%2Fmain%2Fagents%2Fdata-specialist.agent.md)

**Raw URL**
```
https://raw.githubusercontent.com/NoahJenkins/Copilot-Stuff/main/agents/data-specialist.agent.md
```

---

### [devops-specialist.agent.md](./devops-specialist.agent.md)

Optional onboarding-expanded specialist for CI/CD, deployment workflows, and runtime operations in delivery-heavy repositories.

**Install**

[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect?url=vscode%3Achat-agent%2Finstall%3Furl%3Dhttps%3A%2F%2Fraw.githubusercontent.com%2FNoahJenkins%2FCopilot-Stuff%2Fmain%2Fagents%2Fdevops-specialist.agent.md) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect?url=vscode-insiders%3Achat-agent%2Finstall%3Furl%3Dhttps%3A%2F%2Fraw.githubusercontent.com%2FNoahJenkins%2FCopilot-Stuff%2Fmain%2Fagents%2Fdevops-specialist.agent.md)

**Raw URL**
```
https://raw.githubusercontent.com/NoahJenkins/Copilot-Stuff/main/agents/devops-specialist.agent.md
```

---

### [testing-specialist.agent.md](./testing-specialist.agent.md)

Optional onboarding-expanded specialist for test strategy, automation patterns, and quality assurance practices across all testing levels.

**Install**

[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect?url=vscode%3Achat-agent%2Finstall%3Furl%3Dhttps%3A%2F%2Fraw.githubusercontent.com%2FNoahJenkins%2FCopilot-Stuff%2Fmain%2Fagents%2Ftesting-specialist.agent.md) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect?url=vscode-insiders%3Achat-agent%2Finstall%3Furl%3Dhttps%3A%2F%2Fraw.githubusercontent.com%2FNoahJenkins%2FCopilot-Stuff%2Fmain%2Fagents%2Ftesting-specialist.agent.md)

**Raw URL**
```
https://raw.githubusercontent.com/NoahJenkins/Copilot-Stuff/main/agents/testing-specialist.agent.md
```

---

### [infrastructure-specialist.agent.md](./infrastructure-specialist.agent.md)

Optional onboarding-expanded specialist for cloud infrastructure design, IaC practices, and platform architecture in infrastructure-heavy repositories.

**Install**

[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect?url=vscode%3Achat-agent%2Finstall%3Furl%3Dhttps%3A%2F%2Fraw.githubusercontent.com%2FNoahJenkins%2FCopilot-Stuff%2Fmain%2Fagents%2Finfrastructure-specialist.agent.md) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect?url=vscode-insiders%3Achat-agent%2Finstall%3Furl%3Dhttps%3A%2F%2Fraw.githubusercontent.com%2FNoahJenkins%2FCopilot-Stuff%2Fmain%2Fagents%2Finfrastructure-specialist.agent.md)

**Raw URL**
```
https://raw.githubusercontent.com/NoahJenkins/Copilot-Stuff/main/agents/infrastructure-specialist.agent.md
```

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

## Archived agent versions

Older agent versions are stored in [docs/archive/](./archive/) for reference only and are not considered active install targets.
