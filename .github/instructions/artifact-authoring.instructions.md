---
description: Authoring and review standards for Copilot artifact files in this repository.
applyTo: '**/*.prompt.md, **/*.instructions.md, **/*.agent.md, **/SKILL.md, **/plugins/**'
---

## Prompt File Guide

- [ ] The prompt has markdown front matter.
- [ ] The prompt has a `description` field (non-empty).
- [ ] The filename is lowercase with words separated by hyphens.
- [ ] Encourage the use of `tools`, but it's not required.
- [ ] Strongly encourage the use of `model` to specify the model the prompt is optimized for.
- [ ] Strongly encourage the use of `name` to set a clear prompt name.
- [ ] If a `mode` field is provided, ensure it uses a valid Copilot prompt mode.

## Instruction File Guide

- [ ] Repo-level custom instructions are stored at `.github/copilot-instructions.md`.
- [ ] Reusable instruction artifacts in `instructions/` use `.instructions.md`.
- [ ] Instruction files have markdown front matter.
- [ ] Instruction files have a `description` field (non-empty).
- [ ] The filename is lowercase with words separated by hyphens.
- [ ] `.instructions.md` files include an `applyTo` field.
- [ ] If multiple globs are used in `applyTo`, they are formatted like `'**/*.js, **/*.ts'`.

## Agent File Guide

- [ ] Follow the shared agent structure standard in `.github/instructions/agent-structure.instructions.md`.
- [ ] The agent has markdown front matter.
- [ ] The agent has a `description` field (non-empty).
- [ ] The filename is lowercase with words separated by hyphens.
- [ ] Encourage the use of `tools`, but it's not required.
- [ ] Strongly encourage the use of `model` to specify the model the agent is optimized for.
- [ ] Strongly encourage the use of `name` to set a clear agent name.

## Skill Guide

**Only apply if a `skills/` directory exists.**

- [ ] The skill folder contains a `SKILL.md` file.
- [ ] The `SKILL.md` file has markdown front matter with `name`, `description` fields.
- [ ] The `name` value is lowercase with words separated by hyphens and matches the folder name.
- [ ] The `description` field is non-empty, at least 10 characters, and at most 1024 characters.
- [ ] The `description` value is wrapped in single quotes.
- [ ] The folder name is lowercase with words separated by hyphens.
- [ ] Any bundled assets (scripts, templates, data files) are referenced in `SKILL.md` instructions.
- [ ] Bundled assets are reasonably sized (under 5MB per file).

## Plugin Guide

**Only apply if a `plugins/` directory exists.**

- [ ] The plugin directory contains a `.github/plugin/plugin.json` file and a `README.md`.
- [ ] `plugin.json` has `name` (matching the directory name) and `description` fields.
- [ ] The directory name is lowercase with words separated by hyphens.
- [ ] If `tags` is present, it is an array of lowercase hyphenated strings.
- [ ] If `items` is present, each item has `path` and `kind` fields.
- [ ] The `kind` value is one of: `prompt`, `agent`, `instruction`, `skill`, or `hook`.
- [ ] The plugin does not reference non-existent files.
