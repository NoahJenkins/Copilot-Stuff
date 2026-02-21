# Agent Tools Update

**Date:** 2026-02-20

## Context
The tools used by the agents in the `agents/` directory were outdated and did not match the current GitHub Copilot custom agents configuration documentation. The previous tools list included `codebase`, `editFiles`, `fetch`, and `usages`, which are not valid tool aliases according to the latest documentation.

## Changes
- Updated the `tools` property in all agent markdown files in the `agents/` directory.
- Replaced the invalid tools list `["codebase", "search", "editFiles", "fetch", "usages"]` with the valid tool aliases `["read", "search", "edit", "web"]`.
- The new tools list maps to the following capabilities:
  - `read`: Read file contents.
  - `search`: Search for files or text in files.
  - `edit`: Allow LLM to edit files.
  - `web`: Allows fetching content from URLs and performing a web search.

## References
- [Custom agents configuration - Tools](https://docs.github.com/en/copilot/reference/custom-agents-configuration#tools)
