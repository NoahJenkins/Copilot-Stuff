---
description: Standardizes how new Copilot agent artifacts are authored in this repository.
applyTo: 'agents/*.agent.md, .github/agents/*.agent.md'
---

# Agent Structure Standard

When creating or revising agent artifacts in this repository, follow this structure and style unless the user explicitly asks for a different format.

## Required front matter

Every agent file must include:
- `name`: lowercase, hyphenated, unique within the folder
- `description`: concise, specific, and non-empty
- `model`: explicitly declared
- `tools`: explicitly declared list

## Required body structure

Use this section order:

1. `# <Agent Name> Agent`
2. One-sentence role statement
3. `## Mission`
4. `## Scope`
5. `## Operating workflow`
6. `## Quality checklist`
7. `## Default behavior`

Add optional sections only when needed for the domain:
- `## Source hierarchy`
- `## Finding format`
- `## Severity scale`
- `## Critical constraints`

## Authoring rules

- Keep instructions actionable, concrete, and testable.
- Prefer concise bullets over long prose.
- Use numbered workflow steps with short sub-bullets.
- Preserve domain-specific reporting rules (for example severity scales).
- Avoid contradictory instructions and duplicate guidance.
- Keep behavior scoped to the artifact purpose.

## Output expectations for agent behavior

Default behavior should define what the agent returns first and in what format.
Examples:
- Review agents: prioritized findings first.
- Research agents: evidence-backed summary first.
- Documentation agents: files updated and linkage summary first.

## Baseline template

```markdown
---
name: <lowercase-hyphenated-name>
description: <specific, non-empty description>
model: <model-id>
tools: [<tool1>, <tool2>]
---

# <Agent Name> Agent

You are a <domain> specialist. <one-sentence role statement>

## Mission

<clear purpose and outcomes>

## Scope

<what this agent should and should not handle>

## Operating workflow

1. <step one>
- <key checks>

2. <step two>
- <key checks>

3. <step three>
- <key checks>

## Quality checklist

Before finalizing, verify:
- <check 1>
- <check 2>
- <check 3>

## Default behavior

When asked to perform this role:
1. <primary output first>
2. <secondary output>
3. <final summary or next actions>
```
