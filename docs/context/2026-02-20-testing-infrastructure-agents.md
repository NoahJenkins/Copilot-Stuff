# Testing and Infrastructure Specialist Agents

**Date:** 2026-02-20

## Summary

Added two new `onboarding-expanded` specialist agents to close coverage gaps in the agent catalog: `testing-specialist` (test strategy, automation, QA) and `infrastructure-specialist` (cloud infrastructure, IaC, platform architecture).

## Findings

- Gap analysis of existing onboarding-tagged agents identified testing/QA and cloud infrastructure as the two highest-value missing domains for software and infrastructure projects.
- Existing agents covered code review, documentation, research, security (core) and frontend, backend, data, devops (expanded) but had no dedicated coverage for test strategy or IaC/cloud architecture.
- The `testing-specialist` addresses test level selection, coverage analysis, flaky test diagnosis, test data management, and assertion quality.
- The `infrastructure-specialist` addresses IaC review (Terraform, Pulumi, CloudFormation, Bicep, CDK), cloud architecture trade-offs, networking, scaling, cost optimization, and container orchestration.
- Both agents follow the shared agent structure standard and use `onboarding-expanded` tagging with domain-specific capability tags (`testing`, `infrastructure`).

## Sources

- Existing agent artifacts in `agents/` folder
- Agent structure standard: `.github/instructions/agent-structure.instructions.md`

## Open Questions

- None at this time.
