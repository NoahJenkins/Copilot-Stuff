# Sync Agents Skill Update

**Date:** 2026-02-20

## Context
When syncing the `.github/copilot-instructions.md` file to the active agent configurations (`CLAUDE.md` and `AGENTS.md`), the content was accidentally appended to the existing files instead of overwriting them, resulting in duplicated content.

## Changes
- Updated the `sync-agents` skill (`.github/skills/sync-agents/SKILL.md`) to explicitly instruct the agent to completely overwrite the existing file content when inserting the content of `.github/copilot-instructions.md`.
- Added a warning to prevent appending the content to the existing file, which causes duplication.
