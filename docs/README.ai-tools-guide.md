# AI Coding Tools Guide — When to Use What

> This guide explains every type of AI coding artifact, which tools read which files, and how to pick the right one for your situation. Written for developers still getting familiar with AI coding tools.

---

## Contents

- [The Landscape — Which Tools Read Which Files](#the-landscape--which-tools-read-which-files)
- [Artifact Types Explained](#artifact-types-explained)
- [Decision Tree — Which Artifact Should I Use?](#decision-tree--which-artifact-should-i-use)
- [Multi-Tool Setup Strategies](#multi-tool-setup-strategies)
- [Where AGENTS.md Fits Today](#where-agentsmd-fits-today-2026)
- [This Repository's Setup](#this-repositorys-setup)
- [Further Reading](#further-reading)

---

## The Landscape — Which Tools Read Which Files

Every major AI coding tool has its own instruction file. As of 2026, the ecosystem is consolidating around `AGENTS.md` as a universal standard, but most tools still maintain their own native format.

| File / Directory | Tools That Read It | When Applied | Scope |
| :--- | :--- | :--- | :--- |
| `AGENTS.md` | GitHub Copilot *(Aug 2025+)*, OpenAI Codex, OpenCode, Cursor, Gemini CLI, VS Code | Automatic — every session | Repository-wide (universal standard) |
| `.github/copilot-instructions.md` | GitHub Copilot | Automatic — every session | Repository-wide |
| `.github/instructions/*.instructions.md` | GitHub Copilot | Automatic — when file path matches `applyTo` glob | Path-scoped |
| `CLAUDE.md` | Claude Code | Automatic — every session | Repository-wide |
| `GEMINI.md` | Google Gemini CLI | Automatic — every session | Repository-wide |
| `.cursorrules` / `.cursor/rules/*.mdc` | Cursor | Automatic — every session | Repository-wide or path-scoped |
| `.windsurfrules` / `.windsurf/rules/*.md` | Windsurf | Automatic — every session | Repository-wide or path-scoped |
| `.clinerules` / `.clinerules/*.md` | Cline | Automatic — every session | Repository-wide |
| `.roo/rules/*.md` | Roo Code | Automatic — every session | Repository-wide |
| `.junie/guidelines.md` | JetBrains Junie | Automatic — every session | Repository-wide |
| `.rules` | Zed | Automatic — every session | Repository-wide |
| `.augment/rules/*.md` | Augment Code | Automatic — every session | Repository-wide |
| `.github/prompts/*.prompt.md` | GitHub Copilot (VS Code, Rider, IntelliJ) | Manual — user invokes `/command` | Task-specific |
| `.github/agents/*.agent.md` | GitHub Copilot (agent mode) | Automatic — when agent is invoked by name | Agent-specific |
| `.claude/agents/*.md` | Claude Code | Automatic — delegated by Claude | Agent-specific |
| `.github/skills/<name>/SKILL.md` | GitHub Copilot, Claude Code, OpenAI Codex | Manual — user invokes `/command` | Task-specific |

**Key insight:** When `AGENTS.md` and `.github/copilot-instructions.md` both exist in a repo, GitHub Copilot reads **both**. `AGENTS.md` takes higher precedence. Nested `AGENTS.md` files in subdirectories override the root file for that directory's context (useful for monorepos).

---

## Artifact Types Explained

### Always-On Instruction Files

**What they are:** Markdown files that AI tools load automatically at the start of every conversation. You don't invoke them — they're always in context.

**Files:** `AGENTS.md`, `CLAUDE.md`, `.github/copilot-instructions.md`, `GEMINI.md`, `.cursorrules`, `.windsurfrules`, etc.

**What to put in them:**
- Tech stack and project structure
- Coding conventions and style rules
- Commands to run (test, build, lint)
- Things the AI should always do or avoid
- Workflow rules that apply to all tasks

**What NOT to put in them:** Step-by-step workflows for specific tasks, rarely-used procedures, or instructions so long the AI forgets the earlier parts. Keep these files focused — under 200 lines is a good target.

**Example use case:** "Always use TypeScript strict mode. Tests live in `src/__tests__/`. Never commit directly to `main`."

---

### Path-Scoped Instructions

**What they are:** Instruction files that only activate when the AI is working on files matching a specific path pattern. GitHub Copilot uses `.github/instructions/*.instructions.md` with an `applyTo` frontmatter field; Cursor uses `.cursor/rules/*.mdc` with a `globs` field.

**What to put in them:**
- Framework-specific rules that only apply to certain directories
- Language-specific conventions (e.g., different rules for Python vs TypeScript)
- Directory-specific context (e.g., "files in `src/api/` are REST handlers — always validate input")

**Example use case:** "Apply React best practices only to `src/components/**/*.tsx` files."

---

### Prompts / Slash Commands

**What they are:** Reusable instruction sets you invoke explicitly with a `/command`. In GitHub Copilot, these live in `.github/prompts/*.prompt.md`. In Claude Code and Copilot, skills (see below) serve a similar purpose.

**When to use:** For multi-step workflows you repeat often but don't need active in every conversation — code review checklists, onboarding sequences, deployment runbooks, analysis tasks.

**Key difference from instruction files:** Instructions apply automatically. Prompts are invoked manually when you need them.

**Example use case:** `/create-adr` — a prompt that guides the AI through writing a formatted Architecture Decision Record.

---

### Custom Agents / Subagents

**What they are:** Isolated AI assistants with their own system prompt, tool access, and (optionally) a different model. They run in a separate context window so they don't crowd your main conversation.

- **GitHub Copilot:** `.github/agents/*.agent.md` (used in agent mode)
- **Claude Code:** `.claude/agents/*.md` (automatically delegated to by Claude)

**When to use:**
- Tasks that need specialized expertise (security review, documentation writing, data analysis)
- Tasks where you want isolation so the specialist doesn't pollute your main context
- When you want different tool access (e.g., an agent that can only read files, not write them)
- Parallel workstreams — Claude Code can run multiple subagents simultaneously

**Key difference from skills:** Agents are specialists who run autonomously in their own context. Skills are step-by-step playbooks you follow in your main context.

**Example use case:** A `security-specialist` agent that only runs when you ask for a security review, keeps its threat-model context separate from your coding context, and always outputs severity-graded findings.

---

### Skills

**What they are:** Portable, folder-based playbooks stored in `SKILL.md` files. An open standard supported by GitHub Copilot, Claude Code, and OpenAI Codex. Triggered by `/command` name.

- **GitHub Copilot:** `.github/skills/<name>/SKILL.md`
- **Claude Code:** `.claude/skills/<name>/SKILL.md`
- **OpenAI Codex / OpenCode:** `.agents/skills/<name>/SKILL.md`

**When to use:** Complex, multi-step workflows that benefit from explicit step-by-step instructions — especially when the same workflow should be reusable across multiple repositories.

**Key difference from prompts:** Skills are installable artifacts (they travel with the repo and can be installed from a registry). Prompt files are simpler and more IDE-bound. Skills also work identically across Copilot, Claude, and Codex.

**Example use case:** `/sync-agents` — a skill that detects all configured AI tools in a repo and propagates your Copilot instructions to all of them.

---

### Hooks

**What they are:** Shell commands, HTTP calls, or LLM prompts that Claude Code executes automatically at specific points in its workflow — before a tool runs, after a file is saved, when a conversation ends, etc. Claude Code only (not available in Copilot or Codex).

**When to use:** For rules that must be enforced **100% of the time, with zero exceptions**. Unlike instruction files (where Claude uses its judgment), hooks are deterministic — they always fire.

**Examples:**
- Auto-run `eslint --fix` every time Claude saves a `.ts` file
- Block writes to `src/secrets/` unconditionally
- Run your test suite after every batch of code changes
- Send a Slack notification when a deploy workflow starts

**Key difference from instruction files:** An instruction file says "please do X." A hook **does X** regardless of what the AI thinks. Use hooks for safety guardrails and quality gates that must never be skipped.

---

## Decision Tree — Which Artifact Should I Use?

```
Should this apply automatically to every task?
│
├─ YES ──> Does it apply to the whole repo?
│           │
│           ├─ YES ──> Instruction file
│           │           Use AGENTS.md (universal) or tool-specific file
│           │           (CLAUDE.md, copilot-instructions.md, GEMINI.md, etc.)
│           │
│           └─ NO  ──> Path-scoped instruction
│                       .github/instructions/*.instructions.md  (Copilot)
│                       .cursor/rules/*.mdc                     (Cursor)
│
└─ NO  ──> Must it fire 100% of the time with zero exceptions?
            │
            ├─ YES ──> Hook  (Claude Code only)
            │           e.g. linting, safety guardrails, test runners
            │
            └─ NO  ──> Does the user trigger it explicitly?
                        │
                        ├─ YES ──> Prompt / Slash Command
                        │           .github/prompts/*.prompt.md  (Copilot)
                        │           Or a Skill with /command trigger
                        │
                        └─ NO  ──> Does it need isolated memory or different tools?
                                    │
                                    ├─ YES ──> Custom Agent / Subagent
                                    │           .github/agents/*.agent.md  (Copilot)
                                    │           .claude/agents/*.md        (Claude Code)
                                    │
                                    └─ NO  ──> Skill (/command workflow)
                                                .github/skills/<name>/SKILL.md
```

**When in doubt, start with an instruction file.** Add prompts when you have a recurring task-specific workflow. Add agents when a specialist shouldn't interfere with your main context. Add skills when that workflow needs to be portable and installable across repos. Add hooks when a rule must be enforced automatically and unconditionally.

---

## Multi-Tool Setup Strategies

The core challenge of using multiple AI tools in the same repo: they each read different files. Keeping them in sync manually is error-prone. Here are three strategies:

---

### Strategy 1: AGENTS.md-First + `/sync-agents`

**How it works:** Write and maintain your instructions in `AGENTS.md` at the repo root. Use the `/sync-agents` skill to automatically propagate them to all other AI tools detected in your repo. GitHub Copilot, OpenAI Codex, Cursor, Gemini CLI, and VS Code read `AGENTS.md` natively — no sync needed for those. The skill handles the remaining ecosystems (Claude Code, Windsurf, Cline, Roo Code, etc.).

> **Legacy:** If your repo already has `.github/copilot-instructions.md` but no `AGENTS.md`, the skill falls back to reading `copilot-instructions.md` as the source. Migrate by renaming it to `AGENTS.md`.

**Best for:** New repos, and existing repos ready to make AGENTS.md the canonical source.

**Trade-offs:**
- AGENTS.md is the source of truth — no context duplication
- Sync is on-demand (run `/sync-agents` after each update to AGENTS.md)
- All 12+ ecosystems are supported by the skill

---

### Strategy 2: AGENTS.md Only (No Sync)

**How it works:** Write your instructions in `AGENTS.md` and rely entirely on native tool support. No sync skill needed for the tools that read it natively. Accept that Zed, Augment, Windsurf, Cline, Roo Code, Kilo Code, and Junie won't have synced copies unless you add them manually.

**Best for:** Minimal-setup projects that only use tools with native AGENTS.md support (Copilot, Codex, Cursor, Gemini CLI, VS Code).

**Trade-offs:**
- Zero maintenance — one file, no commands to run
- Tools without native AGENTS.md support are excluded
- Combine with Strategy 1 (add `/sync-agents`) when you need broader coverage

---

### Strategy 3: Symlink Strategy (Advanced)

**How it works:** Create one real source file and symlink other file locations to point to it. Any edit to the source propagates everywhere automatically.

```bash
# Example: AGENTS.md as source of truth, others as symlinks
ln -s AGENTS.md CLAUDE.md
ln -s AGENTS.md GEMINI.md
```

**Best for:** Solo developers on macOS/Linux who want zero duplication.

**Important trade-offs:**

| Factor | Notes |
| :--- | :--- |
| macOS/Linux | Works by default |
| Windows | Requires Developer Mode or admin privileges for git to follow symlinks |
| GitHub.com | Shows symlinks as a link to the target, not as inline content |
| CI/CD | Some environments don't follow symlinks — test yours |
| Team repos | Only use symlinks if all contributors have symlink-aware git (`core.symlinks=true`) |

**Which strategy is right for you?**

| Your situation | Recommended strategy |
| :--- | :--- |
| New repo, any toolset | Strategy 1 (AGENTS.md + /sync-agents) |
| Solo dev, Claude Code is your primary tool | Strategy 1 (AGENTS.md + /sync-agents) |
| Team using multiple tools | Strategy 1 (AGENTS.md + /sync-agents) |
| OSS repo with unknown contributors | Strategy 1 only — avoid symlinks |
| You already have copilot-instructions.md set up | Strategy 1 — rename to AGENTS.md and run /sync-agents |
| Zero-duplication, macOS/Linux solo dev | Strategy 3 (Symlinks) |

---

## Where AGENTS.md Fits Today (2026)

`AGENTS.md` started as OpenAI Codex's instruction file format. As of **August 28, 2025**, GitHub Copilot's coding agent also adopted it. It is now read by:

- **GitHub Copilot** (coding agent mode, Aug 2025+)
- **OpenAI Codex**
- **OpenCode**
- **Google Gemini CLI** (partial support)
- **Cursor**
- **VS Code** (via Copilot integration)

**Precedence when both files exist in GitHub Copilot:**
1. `AGENTS.md` (root) — highest priority
2. `.github/copilot-instructions.md`
3. Nested `AGENTS.md` files in subdirectories override their parent for that directory

**Recommendations:**
- **New repos:** Use `AGENTS.md` as your primary instruction file. It covers the most tools out of the box.
- **Existing Copilot repos:** Keep `.github/copilot-instructions.md` as your source of truth — nothing breaks. Add `AGENTS.md` later if you adopt other tools.
- **Monorepos:** Use nested `AGENTS.md` files at the subdirectory level for package-specific overrides. Codex and Copilot both support this cascade model.

---

## This Repository's Setup

This repository is a **distribution repo** — its artifacts are meant to be installed into your own projects, not used directly here.

- `agents/` — 13 distributable agent files
- `prompts/` — the `onboard-copilot` prompt
- `skills/` — the `sync-agents` and `dependabot-automation` skills
- `docs/` — architecture docs, ADRs, context notes

**For contributors using AI tools while working IN this repo:**
- `AGENTS.md` (root) — universal contributor context (this repo's structure, workflow rules)
- `CLAUDE.md` (root) — same content as `AGENTS.md`, for Claude Code users
- `.github/copilot-instructions.md` — code review rules for Copilot (scoped to reviews only)
- `.github/agents/` — four specialized Copilot agents available in agent mode

**Propagation workflow:** When working in a target repo (not this one), install the `/sync-agents` skill and run it to propagate `AGENTS.md` to all detected AI tools. If the target repo only has `.github/copilot-instructions.md`, the skill falls back to that as the source automatically.

---

## Further Reading

**GitHub Copilot**
- [Custom instructions for GitHub Copilot](https://docs.github.com/copilot/customizing-copilot/adding-custom-instructions-for-github-copilot)
- [Copilot coding agent now supports AGENTS.md](https://github.blog/changelog/2025-08-28-copilot-coding-agent-now-supports-agents-md-custom-instructions/)
- [How to write a great AGENTS.md](https://github.blog/ai-and-ml/github-copilot/how-to-write-a-great-agents-md-lessons-from-over-2500-repositories/)
- [Copilot custom agents](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/create-custom-agents)
- [Copilot agent skills](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/create-skills)
- [Prompt files (.github/prompts/)](https://docs.github.com/en/copilot/tutorials/customization-library/prompt-files)

**Claude Code**
- [Claude Code memory and instructions (CLAUDE.md)](https://docs.anthropic.com/en/docs/claude-code/memory)
- [Claude Code sub-agents](https://docs.anthropic.com/en/docs/claude-code/sub-agents)
- [Claude Code hooks](https://docs.anthropic.com/en/docs/claude-code/hooks)

**OpenAI Codex**
- [AGENTS.md guide](https://developers.openai.com/codex/guides/agents-md/)
- [Codex skills](https://developers.openai.com/codex/skills/)

**Other tools**
- [Gemini CLI — GEMINI.md and @imports](https://google-gemini.github.io/gemini-cli/docs/cli/gemini-md.html)
- [Cursor rules](https://docs.cursor.com/context/rules-for-ai)
- [Windsurf rules](https://docs.windsurf.com/windsurf/customize#rules)
- [Zed rules](https://zed.dev/docs/ai/rules)
- [Augment Code rules](https://docs.augmentcode.com/using-augment/augment-rules)
