The following instructions are only to be applied when performing a code review.

## Repository context

This repository organizes artifacts by type:

- `Prompts/`
- `Agents/`
- `Instructions/`
- root index in `ReadMe.md`

Use this structure when validating any additions or changes.

## README updates

- [ ] New prompt artifacts are listed in `Prompts/README.md`.
- [ ] New agent artifacts are listed in `Agents/README.md`.
- [ ] New instruction artifacts are listed in `Instructions/README.md`.
- [ ] If a new top-level artifact category is added, `ReadMe.md` is updated.

## Install button checks

- [ ] Install links use canonical raw GitHub URLs (no cache-busting query parameters like `?v=`).
- [ ] Install links match the artifact type (`chat-prompt`, `chat-agent`, `chat-instructions`).
- [ ] Both VS Code and VS Code Insiders install buttons are present for each artifact.
- [ ] Raw artifact URLs referenced by install links are reachable and return content.

## Prompt file guide

**Apply to files ending in `.prompt.md` (in `Prompts/` and `.github/prompts/`)**

- [ ] The prompt has markdown front matter.
- [ ] The prompt has a `description` field.
- [ ] The `description` field is not empty.
- [ ] The filename is lowercase with words separated by hyphens.
- [ ] Encourage the use of `tools`, but it's not required.
- [ ] Strongly encourage the use of `model` to specify the model the prompt is optimized for.
- [ ] Strongly encourage the use of `name` to set a clear prompt name.
- [ ] If a mode field is provided, ensure it uses a valid Copilot prompt mode for this repo.

## Instruction file guide

**Apply to files ending in `.instructions.md` and the repo-level Copilot instruction file**

- [ ] Repo-level custom instructions are stored at `.github/copilot-instructions.md`.
- [ ] Reusable instruction artifacts in `Instructions/` use `.instructions.md`.
- [ ] Instruction files have markdown front matter.
- [ ] Instruction files have a `description` field.
- [ ] The `description` field is not empty.
- [ ] The filename is lowercase with words separated by hyphens.
- [ ] `.instructions.md` files include an `applyTo` field.
- [ ] If multiple globs are used in `applyTo`, they are formatted like `'**/*.js, **/*.ts'`.

## Agent file guide

**Apply to agent files in `Agents/` (e.g., `*-agent.md` and `.agent.md`)**

- [ ] The agent has markdown front matter.
- [ ] The agent has a `description` field.
- [ ] The `description` field is not empty.
- [ ] The filename is lowercase with words separated by hyphens.
- [ ] Encourage the use of `tools`, but it's not required.
- [ ] Strongly encourage the use of `model` to specify the model the agent is optimized for.
- [ ] Strongly encourage the use of `name` to set a clear agent name.

## Agent Skills guide

**Only apply if a `skills/` directory exists**

- [ ] The skill folder contains a `SKILL.md` file.
- [ ] The `SKILL.md` file has markdown front matter.
- [ ] The `SKILL.md` file has a `name` field.
- [ ] The `name` value is lowercase with words separated by hyphens.
- [ ] The `name` value matches the folder name.
- [ ] The `SKILL.md` file has a `description` field.
- [ ] The `description` field is not empty, at least 10 characters, and maximum 1024 characters.
- [ ] The `description` value is wrapped in single quotes.
- [ ] The folder name is lowercase with words separated by hyphens.
- [ ] Any bundled assets (scripts, templates, data files) are referenced in `SKILL.md` instructions.
- [ ] Bundled assets are reasonably sized (under 5MB per file).

## Plugin guide

**Only apply if a `plugins/` directory exists**

- [ ] The plugin directory contains a `.github/plugin/plugin.json` file.
- [ ] The plugin directory contains a `README.md` file.
- [ ] The `plugin.json` file has a `name` field matching the directory name.
- [ ] The `plugin.json` file has a `description` field.
- [ ] The `description` field is not empty.
- [ ] The directory name is lowercase with words separated by hyphens.
- [ ] If `tags` is present, it is an array of lowercase hyphenated strings.
- [ ] If `items` is present, each item has `path` and `kind` fields.
- [ ] The `kind` value is one of: `prompt`, `agent`, `instruction`, `skill`, or `hook`.
- [ ] The plugin does not reference non-existent files.