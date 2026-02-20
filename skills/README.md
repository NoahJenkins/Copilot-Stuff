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

---

### [sync-agents](./sync-agents/SKILL.md)

Syncs GitHub Copilot instructions, custom agents, and skills into Claude Code, Gemini CLI, and OpenAI Codex formats.

**Install target:** `.github/skills/sync-agents/SKILL.md`

**macOS/Linux**
```bash
mkdir -p .github/skills/sync-agents && curl -fsSL \
  https://raw.githubusercontent.com/NoahJenkins/Copilot-Stuff/main/skills/sync-agents/SKILL.md \
  -o .github/skills/sync-agents/SKILL.md
```

**Windows (PowerShell)**
```powershell
$dest = ".github/skills/sync-agents"
New-Item -ItemType Directory -Force -Path $dest > $null
Invoke-RestMethod https://raw.githubusercontent.com/NoahJenkins/Copilot-Stuff/main/skills/sync-agents/SKILL.md -OutFile "$dest/SKILL.md"
```

---

### [sync-agentsv2](./sync-agentsv2/SKILL.md)

Syncs GitHub Copilot instructions, custom agents, and skills to detected agent ecosystems using a detection-first approach.

**Install target:** `.github/skills/sync-agentsv2/SKILL.md`

**macOS/Linux**
```bash
mkdir -p .github/skills/sync-agentsv2 && curl -fsSL \
  https://raw.githubusercontent.com/NoahJenkins/Copilot-Stuff/main/skills/sync-agentsv2/SKILL.md \
  -o .github/skills/sync-agentsv2/SKILL.md
```

**Windows (PowerShell)**
```powershell
$dest = ".github/skills/sync-agentsv2"
New-Item -ItemType Directory -Force -Path $dest > $null
Invoke-RestMethod https://raw.githubusercontent.com/NoahJenkins/Copilot-Stuff/main/skills/sync-agentsv2/SKILL.md -OutFile "$dest/SKILL.md"
```

## Notes

- VS Code supports one-click install links for prompts, agents, and instructions.
- Skills currently use command-based installation because they are folder-based artifacts.
