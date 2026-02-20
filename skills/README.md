# Skills

This directory contains reusable GitHub Copilot skill artifacts.

## Quick Install

Run from the root of your target workspace repository.

### macOS/Linux

```bash
curl -fsSL https://raw.githubusercontent.com/NoahJenkins/Copilot-Stuff/main/skills/install-skill.sh | bash -s -- NoahJenkins/Copilot-Stuff sync-agents
curl -fsSL https://raw.githubusercontent.com/NoahJenkins/Copilot-Stuff/main/skills/install-skill.sh | bash -s -- NoahJenkins/Copilot-Stuff sync-agentsv2
```

### Windows (PowerShell)

```powershell
$tmp = Join-Path $env:TEMP "install-skill.ps1"; irm https://raw.githubusercontent.com/NoahJenkins/Copilot-Stuff/main/skills/install-skill.ps1 -OutFile $tmp; & $tmp -Repo NoahJenkins/Copilot-Stuff -SkillName sync-agents
$tmp = Join-Path $env:TEMP "install-skill.ps1"; irm https://raw.githubusercontent.com/NoahJenkins/Copilot-Stuff/main/skills/install-skill.ps1 -OutFile $tmp; & $tmp -Repo NoahJenkins/Copilot-Stuff -SkillName sync-agentsv2
```

## Available Skills

### sync-agents

- Description: Syncs GitHub Copilot instructions, custom agents, and skills into Claude Code, Gemini CLI, and OpenAI Codex formats.
- Source: [sync-agents/SKILL.md](./sync-agents/SKILL.md)
- Raw URL: `https://raw.githubusercontent.com/NoahJenkins/Copilot-Stuff/main/skills/sync-agents/SKILL.md`
- Install target: `.github/skills/sync-agents/SKILL.md`

| macOS/Linux | Windows PowerShell |
| :--- | :--- |
| [![Install sync-agents](https://img.shields.io/badge/Install-sync--agents-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](#macoslinux) | [![Install sync-agents on Windows](https://img.shields.io/badge/Install-sync--agents-24bfa5?style=flat-square&logo=powershell&logoColor=white)](#windows-powershell) |

### sync-agentsv2

- Description: Syncs GitHub Copilot instructions, custom agents, and skills to detected agent ecosystems using a detection-first approach.
- Source: [sync-agentsv2/SKILL.md](./sync-agentsv2/SKILL.md)
- Raw URL: `https://raw.githubusercontent.com/NoahJenkins/Copilot-Stuff/main/skills/sync-agentsv2/SKILL.md`
- Install target: `.github/skills/sync-agentsv2/SKILL.md`

| macOS/Linux | Windows PowerShell |
| :--- | :--- |
| [![Install sync-agentsv2](https://img.shields.io/badge/Install-sync--agentsv2-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](#macoslinux) | [![Install sync-agentsv2 on Windows](https://img.shields.io/badge/Install-sync--agentsv2-24bfa5?style=flat-square&logo=powershell&logoColor=white)](#windows-powershell) |

## Note

VS Code currently supports one-click install links for prompts, agents, and instructions. Skills are folder-based artifacts, so this README provides command-based install actions that create `.github/skills/<skill-name>/` and download `SKILL.md`.
