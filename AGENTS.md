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
9. Generated suggestions

Stop and record a blocker when authoritative sources conflict. Never invent product, legal, financial, security, retention, or authorization policy.

## Delivery rules

- Work on one active vertical slice by default.
- Implement only approved requirement IDs.
- Prefer existing code, framework capabilities, and dependencies.
- Use a modular monolith and vertical slices unless an approved ADR says otherwise.
- Do not add microservices, generic repositories, event buses, or abstractions mechanically.
- Run deterministic checks before model-backed review.
- The implementer cannot issue the final completion verdict.
- No autonomous merge or production deployment.

## UI defaults

For UI tasks, apply only the skills installed in the target project. Recommended order: approved design baseline, UI UX Pro Max, Impeccable, Emil Design Engineering, then Ponytail implementation constraints.

## Verdicts

PASS, FAIL, BLOCKED, HUMAN_DECISION_REQUIRED, or BUDGET_EXCEEDED.
