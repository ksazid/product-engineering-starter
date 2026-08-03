# Optional deployment-cost advisor

PES does not choose or enable a hosting provider by default. The deployment-cost advisor compares a reviewed workload profile with provider-fit rules and produces a recommendation only.

## Use

Edit:

```text
deployment/PROFILE.json
```

Then run:

```bash
npm run deployment:advise
```

The command does not authenticate, provision infrastructure, modify DNS, create databases, or deploy code.

## Current adapters

- `cloudflare` — static assets, edge-compatible APIs and low-egress workloads
- `netlify` — frontend previews, static sites and supported web frameworks
- `vercel` — Next.js-focused delivery and pull-request previews
- `render` — containerized APIs, persistent services and background workers

Adapters are decision guidance, not provider SDK dependencies. A generated project may later add the selected provider's official CLI or configuration through an approved slice.

## Decision factors

The advisor considers:

- frontend and backend runtime
- prototype, pilot or production stage
- commercial use
- expected traffic and bandwidth
- cold-start tolerance
- preview deployment needs
- edge execution
- background jobs
- regional requirements
- stated monthly budget

## Required verification

Provider prices, free-tier limits, quotas and commercial terms change. Before accepting a recommendation, verify current official documentation for:

- compute and function limits
- bandwidth and egress
- build minutes and preview usage
- database, storage and backup costs
- sleep, cold-start and availability behaviour
- regions and data residency
- commercial-use restrictions
- observability and log retention

## Governance

- Recommendations never enable a plugin automatically.
- Production deployment always requires human approval.
- The final durable provider selection should be recorded in an ADR.
- Exact-SHA certification and protected-environment release gates remain mandatory.
- Free services must not be treated as production-ready unless the provider explicitly supports that use and the project accepts the operational trade-offs.
- Keep deployment configuration removable; business and domain code must not depend directly on a hosting provider.

## Adding an adapter

A new adapter must document:

1. supported runtimes and deployment model
2. known constraints and portability risks
3. cost drivers rather than hard-coded prices
4. security, secrets, rollback and observability expectations
5. an uninstall or migration path
6. tests for its scoring rules

Do not merge an adapter whose main purpose is affiliate promotion or whose recommendation cannot be independently verified.
