# 🎯 Skills

Reusable GitHub Copilot skills for task-specific workflows.

Skills are folder-based artifacts with a required `SKILL.md` file.

## How to install skills

Run commands from the root of your target workspace repository.

### macOS/Linux

```bash
curl -fsSL https://raw.githubusercontent.com/NoahJenkins/Copilot-Stuff/main/skills/install-skill.sh | bash -s -- NoahJenkins/Copilot-Stuff <skill-name>
```

### Windows (PowerShell)

```powershell
$tmp = Join-Path $env:TEMP "install-skill.ps1"; irm https://raw.githubusercontent.com/NoahJenkins/Copilot-Stuff/main/skills/install-skill.ps1 -OutFile $tmp; & $tmp -Repo NoahJenkins/Copilot-Stuff -SkillName <skill-name>
```

The installer creates `.github/skills/<skill-name>/` (if needed) and downloads `SKILL.md` into that folder.

## Skill catalog

| Skill | Description | Install target |
| :--- | :--- | :--- |
| [sync-agents](./sync-agents/SKILL.md)<br />Raw: `https://raw.githubusercontent.com/NoahJenkins/Copilot-Stuff/main/skills/sync-agents/SKILL.md`<br />[![Install (macOS/Linux)](https://img.shields.io/badge/Install-macOS%2FLinux-0098FF?style=flat-square&logo=gnu-bash&logoColor=white)](#macoslinux)<br />[![Install (Windows)](https://img.shields.io/badge/Install-Windows-24bfa5?style=flat-square&logo=powershell&logoColor=white)](#windows-powershell) | Syncs GitHub Copilot instructions, custom agents, and skills into Claude Code, Gemini CLI, and OpenAI Codex formats. | `.github/skills/sync-agents/SKILL.md` |
| [sync-agentsv2](./sync-agentsv2/SKILL.md)<br />Raw: `https://raw.githubusercontent.com/NoahJenkins/Copilot-Stuff/main/skills/sync-agentsv2/SKILL.md`<br />[![Install (macOS/Linux)](https://img.shields.io/badge/Install-macOS%2FLinux-0098FF?style=flat-square&logo=gnu-bash&logoColor=white)](#macoslinux)<br />[![Install (Windows)](https://img.shields.io/badge/Install-Windows-24bfa5?style=flat-square&logo=powershell&logoColor=white)](#windows-powershell) | Syncs GitHub Copilot instructions, custom agents, and skills to detected agent ecosystems using a detection-first approach. | `.github/skills/sync-agentsv2/SKILL.md` |

## Notes

- VS Code supports one-click install links for prompts, agents, and instructions.
- Skills currently use command-based installation because they are folder-based artifacts.
