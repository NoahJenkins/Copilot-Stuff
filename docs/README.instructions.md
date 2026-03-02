# Instructions

Reusable GitHub Copilot path-scoped instruction files for common project conventions.

## How to use instruction files

**Install**

- Click the install button for VS Code or VS Code Insiders.
- Confirm the destination when VS Code asks where to save the instruction file.
- The file installs to `.github/instructions/` in your workspace.

**Customize**

Each file includes an `applyTo` glob that controls when Copilot loads it. Update the glob and any `[fill in]` placeholders to match your project's stack and folder structure.

## Instruction catalog

---

### [security.instructions.md](../instructions/security.instructions.md)

Security requirements for API routes, middleware, and data access code. Covers secrets hygiene, input validation, authentication, error handling, and dependency supply chain.

**Default `applyTo`:** `src/app/api/**, src/lib/**, src/middleware*` — adapt to your stack.

**Install**

[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect?url=vscode%3Achat-instructions%2Finstall%3Furl%3Dhttps%3A%2F%2Fraw.githubusercontent.com%2FNoahJenkins%2FCopilot-Stuff%2Fmain%2Finstructions%2Fsecurity.instructions.md) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect?url=vscode-insiders%3Achat-instructions%2Finstall%3Furl%3Dhttps%3A%2F%2Fraw.githubusercontent.com%2FNoahJenkins%2FCopilot-Stuff%2Fmain%2Finstructions%2Fsecurity.instructions.md)

**Raw URL**
```
https://raw.githubusercontent.com/NoahJenkins/Copilot-Stuff/main/instructions/security.instructions.md
```

---

### [documentation.instructions.md](../instructions/documentation.instructions.md)

Documentation structure, ADR format, and documentation update policy. Applies to `docs/**`, `*.md`, and `*.mdx` files.

**Default `applyTo`:** `docs/**, *.md, *.mdx`

**Install**

[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect?url=vscode%3Achat-instructions%2Finstall%3Furl%3Dhttps%3A%2F%2Fraw.githubusercontent.com%2FNoahJenkins%2FCopilot-Stuff%2Fmain%2Finstructions%2Fdocumentation.instructions.md) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect?url=vscode-insiders%3Achat-instructions%2Finstall%3Furl%3Dhttps%3A%2F%2Fraw.githubusercontent.com%2FNoahJenkins%2FCopilot-Stuff%2Fmain%2Finstructions%2Fdocumentation.instructions.md)

**Raw URL**
```
https://raw.githubusercontent.com/NoahJenkins/Copilot-Stuff/main/instructions/documentation.instructions.md
```

---

### [testing.instructions.md](../instructions/testing.instructions.md)

Test file conventions, framework choices, coverage expectations, and mocking approach. Applies to test and spec files.

**Default `applyTo`:** `**/*.test.*, **/*.spec.*, **/__tests__/**, **/tests/**`

**Install**

[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect?url=vscode%3Achat-instructions%2Finstall%3Furl%3Dhttps%3A%2F%2Fraw.githubusercontent.com%2FNoahJenkins%2FCopilot-Stuff%2Fmain%2Finstructions%2Ftesting.instructions.md) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect?url=vscode-insiders%3Achat-instructions%2Finstall%3Furl%3Dhttps%3A%2F%2Fraw.githubusercontent.com%2FNoahJenkins%2FCopilot-Stuff%2Fmain%2Finstructions%2Ftesting.instructions.md)

**Raw URL**
```
https://raw.githubusercontent.com/NoahJenkins/Copilot-Stuff/main/instructions/testing.instructions.md
```

---

### [frontend.instructions.md](../instructions/frontend.instructions.md)

Frontend component conventions, styling approach, and framework-specific patterns. Applies to component and app directories.

**Default `applyTo`:** `src/components/**, src/app/**` — adapt to your frontend folder layout.

**Install**

[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect?url=vscode%3Achat-instructions%2Finstall%3Furl%3Dhttps%3A%2F%2Fraw.githubusercontent.com%2FNoahJenkins%2FCopilot-Stuff%2Fmain%2Finstructions%2Ffrontend.instructions.md) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect?url=vscode-insiders%3Achat-instructions%2Finstall%3Furl%3Dhttps%3A%2F%2Fraw.githubusercontent.com%2FNoahJenkins%2FCopilot-Stuff%2Fmain%2Finstructions%2Ffrontend.instructions.md)

**Raw URL**
```
https://raw.githubusercontent.com/NoahJenkins/Copilot-Stuff/main/instructions/frontend.instructions.md
```

---

### [pr-commits.instructions.md](../instructions/pr-commits.instructions.md)

Git commit format, branch naming conventions, pull request expectations, and merge strategy. Applies globally to all files.

**Default `applyTo`:** `**`

**Install**

[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect?url=vscode%3Achat-instructions%2Finstall%3Furl%3Dhttps%3A%2F%2Fraw.githubusercontent.com%2FNoahJenkins%2FCopilot-Stuff%2Fmain%2Finstructions%2Fpr-commits.instructions.md) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect?url=vscode-insiders%3Achat-instructions%2Finstall%3Furl%3Dhttps%3A%2F%2Fraw.githubusercontent.com%2FNoahJenkins%2FCopilot-Stuff%2Fmain%2Finstructions%2Fpr-commits.instructions.md)

**Raw URL**
```
https://raw.githubusercontent.com/NoahJenkins/Copilot-Stuff/main/instructions/pr-commits.instructions.md
```

---

### [agent-structure.instructions.md](../instructions/agent-structure.instructions.md)

Standardizes how new Copilot agent artifacts are authored. Applies to agent files in `agents/` and `.github/agents/`.

**Default `applyTo`:** `agents/*.agent.md, .github/agents/*.agent.md`

**Install**

[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect?url=vscode%3Achat-instructions%2Finstall%3Furl%3Dhttps%3A%2F%2Fraw.githubusercontent.com%2FNoahJenkins%2FCopilot-Stuff%2Fmain%2Finstructions%2Fagent-structure.instructions.md) [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect?url=vscode-insiders%3Achat-instructions%2Finstall%3Furl%3Dhttps%3A%2F%2Fraw.githubusercontent.com%2FNoahJenkins%2FCopilot-Stuff%2Fmain%2Finstructions%2Fagent-structure.instructions.md)

**Raw URL**
```
https://raw.githubusercontent.com/NoahJenkins/Copilot-Stuff/main/instructions/agent-structure.instructions.md
```

---
