# Engineering Governance

## Authority order

1. Approved PRD
2. Approved TRD
3. Approved security decisions
4. Approved ADRs
5. Approved design baseline
6. Approved delivery plan
7. Active vertical slice
8. Repository skills
9. Superpowers implementation plans
10. Generated suggestions

Stop and record a blocker when authoritative sources conflict. Never invent product, legal, financial, security, retention, or authorization policy.

## Delivery rules

- Work on one active vertical slice by default.
- Implement only approved requirement IDs.
- Prefer existing code, framework capabilities, and dependencies.
- Use a modular monolith and vertical slices unless an approved ADR says otherwise.
- Do not add microservices, generic repositories, event buses, or abstractions mechanically.
- Run deterministic checks before model-backed review.
- No autonomous merge or production deployment.

## Superpowers execution

After intake, planning, and slice approval, use `.agents/skills/using-superpowers/SKILL.md` as the default implementation methodology.

Superpowers may provide feature-level brainstorming, writing plans, Git worktrees, TDD, plan execution, subagent-driven development, systematic debugging, code review, verification, and branch completion. It does not own product scope, requirement approval, architecture policy, security acceptance, certification, merge, or release.

- Superpowers plans remain subordinate to the approved PRD, TRD, ADRs, security decisions, design baseline, and active slice.
- Use brainstorming only to clarify implementation detail; do not silently reopen approved product decisions.
- Prefer coherent 10–30 minute implementation steps when they remain independently verifiable.
- Use TDD strongly for domain rules, APIs, regressions, and state machines; apply judgment to exploratory visual work.
- Use subagents only where quality, isolation, or parallelism justifies the additional model cost.
- Repository preflight, security gates, certification, and human approval remain mandatory.

## UI defaults

Apply only skills installed in the target project and load only those relevant to the active task.

- Use the approved design baseline before any skill recommendation.
- Use `design-taste-frontend` for landing pages, marketing surfaces, portfolios, editorial pages, and explicitly approved redesigns.
- Do not use Taste Skill as the primary skill for dashboards, data tables, admin/operator queues, or multi-step product workflows.
- Use UI UX Pro Max for information architecture, task flows, states, forms, responsive behavior, and accessibility.
- Use Impeccable for bounded visual refinement and design-drift correction.
- Use Emil Design Engineering selectively for purposeful motion and interaction feedback.
- Use Ponytail for React/Next.js implementation simplicity and component quality.

Recommended conditional order:

1. Approved requirements and active slice
2. Approved design baseline and tokens
3. Taste Skill when the surface is marketing/editorial or redesign-led
4. UI UX Pro Max for product workflow and accessibility structure
5. Impeccable for bounded polish
6. Emil principles only where motion adds clarity
7. Ponytail for implementation
8. Superpowers implementation and review workflow
9. Automated accessibility, responsive, visual, security, and certification checks

## Verdicts

PASS, FAIL, BLOCKED, HUMAN_DECISION_REQUIRED, or BUDGET_EXCEEDED.
