# Progressive operating modes

The starter begins in **Lite mode**. More governance is recommended only when repository evidence shows that it will reduce risk or rework.

## Lite — default

Use for MVPs and small teams. Includes intake, planning, vertical slices, Superpowers single-agent execution, deterministic preflight, baseline security and human review.

Lite also supports two optional, disabled-by-default integrations:

- **NotebookLM knowledge export** for team onboarding and source-grounded Q&A. GitHub remains authoritative.
- **Caveman Lite** for concise routine communication, plus guarded manual context compression for selected instruction files.

Enable either only when a team chooses it. Neither is required to use PES.

```bash
npm run knowledge:export
npm run optimize:context
```

`knowledge:export` writes a curated bundle under `dist/knowledge/`. `optimize:context` is preview-only unless `--apply` and the explicit approval environment variable are both supplied.

## Standard — growing product

Add when the project has a larger backlog, multiple modules or formal release expectations. Adds ADR governance, threat modelling, evidence bundles, Superpowers worktrees/reviews and complete certification.

NotebookLM and Caveman remain optional. Context compression never applies automatically during a mode upgrade.

## Enterprise — high-risk or multi-team product

Add only when scale and risk justify it. Adds independent maker/checker execution, isolated worktrees, agent budgets and risk-triggered Codex Security.

NotebookLM may support onboarding across teams, but it still has no approval authority. Caveman should remain `lite` for routine summaries and disabled for security, architecture, implementation plans and release evidence.

## Growth advisor

Run:

```bash
npm run engineering:advise
```

The advisor reads repository evidence and recommends capabilities. It never changes the mode, installs a plugin, modifies product policy or enables autonomous execution.

## Adoption rule

A capability must satisfy all of the following before it is enabled:

1. A recurring problem is measured.
2. The capability addresses that problem directly.
3. Its expected benefit exceeds its maintenance and agent-credit cost.
4. A human approves the change.
5. The change can be removed without restructuring the product.

For NotebookLM, the team must define refresh ownership and data-sharing boundaries. For Caveman compression, the team must review backups and diffs and verify that policy meaning, commands, paths and identifiers remain intact.
