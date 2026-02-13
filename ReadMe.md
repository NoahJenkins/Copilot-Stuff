# OnboardCopilot 🤖

`OnboardCopilot` is a comprehensive prompt for GitHub Copilot that automates repository onboarding and setup for both greenfield (new) and brownfield (existing) projects. It scans the codebase (or your intended stack) to generate custom instructions, documentation, security baselines, and development configurations.

## 🚀 Quick Install

To use this prompt directly in VS Code, click the button below:

| [Direct Install in VS Code](vscode:chat-prompt/install?url=https://raw.githubusercontent.com/NoahJenkins/Copilot-Stuff/main/Prompt/onboard-copilot.prompt.md) | [Direct Install in VS Code Insiders](vscode-insiders:chat-prompt/install?url=https://raw.githubusercontent.com/NoahJenkins/Copilot-Stuff/main/Prompt/onboard-copilot.prompt.md) |
| :--- | :--- |
| [![Install in VS Code](https://img.shields.io/badge/VS_Code-Install-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](vscode:chat-prompt/install?url=https://raw.githubusercontent.com/NoahJenkins/Copilot-Stuff/main/Prompt/onboard-copilot.prompt.md) | [![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](vscode-insiders:chat-prompt/install?url=https://raw.githubusercontent.com/NoahJenkins/Copilot-Stuff/main/Prompt/onboard-copilot.prompt.md) |

## ✨ Features

- **Greenfield & Brownfield Detection**: Automatically adapts based on whether the repo is empty or has existing code.
- **Tech Stack Analysis**: Detects primary languages, frameworks, and tools.
- **Automated Documentation**: Generates OR updates READMEs, contribution guides, and architectural decision records.
- **IDE Configuration**: Sets up `.vscode/settings.json` and extensions.
- **Environment Setup**: Creates `.env.example` and provides setup guidance.
- **Security Baseline**: Scans for common security needs and sets up basic protection.
- **GitHub Templates**: Generates issue and pull request templates.

## 🔧 How to Use

1. **Install the prompt** using the buttons above.
2. In VS Code Chat, type `/onboard-copilot` to start the onboarding process.
3. Follow the interactive prompts if it's a greenfield project, or let it analyze your existing codebase.

## 📄 Prompt File

The full prompt file is located at [Prompt/onboard-copilot.prompt.md](Prompt/onboard-copilot.prompt.md).

---
*Created by [Noah Jenkins](https://github.com/NoahJenkins)*
