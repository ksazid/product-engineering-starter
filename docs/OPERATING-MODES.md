# Progressive operating modes

The starter begins in **Lite mode**. More governance is recommended only when repository evidence shows that it will reduce risk or rework.

## Lite — default

Use for MVPs and small teams. Includes intake, planning, vertical slices, deterministic preflight, baseline security and human review.

## Standard — growing product

Add when the project has a larger backlog, multiple modules or formal release expectations. Adds ADR governance, threat modelling, evidence bundles and complete certification.

## Enterprise — high-risk or multi-team product

Add only when scale and risk justify it. Adds independent maker/checker execution, isolated worktrees, agent budgets and risk-triggered Codex Security.

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
