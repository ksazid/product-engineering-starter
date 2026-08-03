
<p align="center">
<img src="docs/assets/pes-overview.png" alt="Product Engineering Starter Overview" width="100%">
</p>




# Product Engineering Starter

An open-source governance layer for turning an approved **PRD** and **TRD** into a traceable, secure, cost-controlled web product.

Product Engineering Starter (PES) decides **what is approved and safe to build**. [Superpowers](https://github.com/obra/superpowers) is the default methodology for **how an approved slice is planned, implemented, reviewed, debugged, and finished**.

## What PES provides

- PRD/TRD intake and conflict detection
- source-linked requirements and traceability
- roadmap, milestones, epics, and vertical slices
- architecture, design, and security governance
- focused slice context, allowed paths, and protected paths
- Loop Engineering-inspired state, budgets, gates, and run history
- deterministic preflight, risk-triggered Codex Security, and certification evidence
- optional provider-neutral deployment-cost guidance
- human-controlled merge and exact-SHA production release

## What Superpowers provides

- feature-level brainstorming and design clarification
- implementation plans
- isolated Git worktrees
- test-driven development
- plan execution or subagent-driven development
- specification-compliance and code-quality review
- systematic debugging and verification
- branch completion and PR/merge choices

Superpowers does not replace the approved PRD, TRD, ADRs, security decisions, design baseline, active slice, certification, or release approval.

## Default web stack

- Next.js + TypeScript
- ASP.NET Core
- PostgreSQL + EF Core
- OpenAPI
- xUnit and Playwright
- Docker Compose
- GitHub Actions

## Prerequisites

- Git 2.40+
- Node.js 24 LTS with npm
- .NET SDK 10.x
- Docker with Compose v2
- A supported coding-agent harness for Superpowers
- Optional: GitHub CLI, PostgreSQL client, Python 3.9+, Codex Security, NotebookLM, MemPalace, and Caveman

## Install PES

### Recommended: GitHub template

Enable **Settings → Template repository**, then select **Use this template**.

### Clone directly

```bash
git clone https://github.com/ksazid/product-engineering-starter.git my-product
cd my-product
npm install
npm run preflight
```

For a separate repository:

```bash
git remote remove origin
git remote add origin https://github.com/<account>/<project>.git
```

## Install Superpowers

Superpowers is installed separately for each coding-agent harness.

### Codex App or Codex CLI

```text
/plugins
```

Search for `Superpowers` and install it from the official marketplace.

### Claude Code

```text
/plugin install superpowers@claude-plugins-official
```

### Cursor

```text
/add-plugin superpowers
```

For other supported harnesses, follow the upstream `obra/superpowers` guide. The PES integration boundary is documented at `.agents/skills/using-superpowers/SKILL.md`.

## Start a product

1. Complete `product/PRD.md`.
2. Complete `product/TRD.md`.
3. Add design rules to `product/DESIGN.md`.
4. Define terminology in `product/GLOSSARY.md`.
5. Approve the source documents.
6. Run intake and planning.

```bash
npm run product:intake
npm run planning:generate
npm run planning:validate
npm run engineering:advise
```

The intake process blocks missing sections, unresolved draft status, conflicts, and unsupported assumptions rather than inventing policy.

## End-to-end workflow

```text
PRD + TRD
→ product, technical, and security intake
→ source-linked requirements
→ roadmap, milestones, epics, and vertical slices
→ human plan approval
→ activate one vertical slice
→ focused slice context
→ optional MemPalace retrieval verified against current Git
→ Superpowers plan, worktree, TDD, implementation, and review
→ deterministic preflight
→ risk-triggered security review
→ optional deployment-cost recommendation
→ certification evidence
→ human merge and exact-SHA release
```

Activate a slice:

```bash
npm run slice:activate -- VS-01
npm run slice:status
npm run slice:validate
```

Then instruct the coding agent to read:

```text
AGENTS.md
.agents/skills/using-superpowers/SKILL.md
docs/slices/VS-01.md
delivery/current-slice.json
```

## Responsibility boundary

| Product Engineering Starter | Superpowers |
| --- | --- |
| Product and technical authority | Feature-level clarification |
| Requirement IDs and traceability | Implementation planning |
| Roadmap and vertical slices | Worktrees and execution |
| Architecture and security policy | TDD and debugging |
| Protected paths and human gates | Spec and code-quality review |
| Preflight and certification | Branch completion workflow |
| Merge and release approval | No release authority |

## Operating modes

PES starts in **Lite** mode.

- **Lite:** intake, planning, slices, Superpowers single-agent execution, deterministic validation, baseline security, and human review.
- **Standard:** adds ADRs, threat modelling, evidence bundles, Superpowers worktrees/reviews, and release certification.
- **Enterprise:** adds budgeted subagent-driven development, independent security review, and risk-triggered Codex Security.

NotebookLM, MemPalace, Caveman Lite, and deployment-cost guidance are optional in every mode and disabled by default. They do not change the mode or authority model.

```bash
npm run profile:show
npm run engineering:advise
```

## Optional team knowledge: NotebookLM

NotebookLM can be used as a team-learning and onboarding layer. **GitHub remains authoritative.** NotebookLM may summarize and explain PES, but it cannot approve requirements, decisions, security risk, certification, or releases.

Create a curated bundle:

```bash
npm run knowledge:export
```

This writes a reviewed bundle under `dist/knowledge/` with source hashes, repository commit SHA, and export time. Full guidance: `docs/integrations/NOTEBOOKLM.md`.

## Optional AI memory: MemPalace

MemPalace is a local-first memory layer for large requirements and long-running projects. It can index selected project documents and prior conversations verbatim, then retrieve only the context relevant to the active slice.

Git remains authoritative. Retrieved memories must be checked against current repository files before entering a context pack.

Recommended local installation:

```bash
uv tool install mempalace
npm run memory:doctor
mempalace init .
```

Example usage:

```bash
mempalace mine product/
mempalace mine docs/
mempalace search "why was this architecture decision made"
mempalace wake-up
```

The default embedded storage is recommended because it avoids a hosted vector-database bill. Never index secrets, credentials, production dumps, regulated personal data, or restricted security findings by default. Full guidance: `docs/integrations/MEMPALACE.md`.

## Optional brevity and context optimization: Caveman

Caveman is an optional plugin for shorter agent communication and guarded context compression. PES recommends **lite** mode only.

Install Caveman separately for the coding-agent harness. A common skills-registry command is:

```bash
npx skills add JuliusBrussee/caveman
```

Preview context optimization:

```bash
npm run optimize:context
```

Apply only after human approval:

```bash
PES_CONTEXT_COMPRESSION_APPROVED=1 npm run optimize:context -- --apply
```

The wrapper uses an explicit allowlist, creates backups, and excludes authoritative or public documents. Full guidance: `docs/integrations/CAVEMAN.md`.

## Deployment strategy

PES treats frontend, API, and database as one coordinated release, even when they are hosted by different providers. The user controls the topology; the advisor only recommends.

### Deployment modes

| Mode | Description | Best fit |
| --- | --- | --- |
| **Advisor recommended** | PES compares supported topologies and recommends the best fit for the reviewed workload profile. The user must approve the result. | Default for most projects |
| **Single provider** | Frontend, API, and database use one provider where the required runtimes and managed database are supported. | Prototypes and teams prioritising operational simplicity |
| **Split deployment** | Frontend, API, and database may each use a different provider. | Cost optimisation, runtime fit, regional needs, or production flexibility |

Selection is configured in:

```text
deployment/PROFILE.json
```

Supported selection values:

```json
{
  "deploymentMode": "advisor-recommended",
  "selectedProviders": {
    "single": null,
    "frontend": null,
    "api": null,
    "database": null
  }
}
```

Use `single-provider`, `split`, or `advisor-recommended`. A selected topology remains inactive until a human approves it and records a durable production decision in an ADR.

### Independently selectable components

**Frontend adapters**

- Cloudflare
- Netlify
- Vercel
- Render
- Other compatible providers added through an approved adapter

**API adapters**

- Render
- Container-compatible cloud platforms
- Edge or serverless platforms when runtime constraints are satisfied
- Other provider adapters added through an approved slice

**Database adapters**

- Neon PostgreSQL
- Supabase PostgreSQL
- Render PostgreSQL
- Provider-managed PostgreSQL
- Other compatible managed PostgreSQL services

The advisor considers database pooling, connection limits, backups, point-in-time recovery, residency, availability, cross-provider latency, egress, and operational ownership—not only headline price.

### Example topologies

Single-provider topology:

```text
Selected provider
├── Frontend
├── API
└── PostgreSQL
```

Split topology:

```text
Vercel
└── Frontend

Render
└── API

Neon
└── PostgreSQL
```

Another cost-oriented split topology:

```text
Cloudflare or Netlify
└── Frontend

Render or another container host
└── API

Neon or Supabase
└── PostgreSQL
```

These are examples, not fixed recommendations. Provider pricing, terms, quotas, regions, and capabilities must be verified against current official documentation before approval.

### Coordinated release policy

All components must use one certified release identity and an approved compatibility contract.

```text
Certified Git SHA
        ↓
Database backup/readiness check
        ↓
Backward-compatible migrations
        ↓
API deployment
        ↓
API health, readiness, auth, CORS, and contract checks
        ↓
Frontend deployment with verified API endpoint
        ↓
Frontend → API → database smoke tests
        ↓
Human production approval
```

Required rules:

- Frontend and API must correspond to the same certified Git SHA or recorded release manifest.
- Database migrations must be backward compatible during rollout wherever practical.
- The API is deployed and verified before dependent frontend changes are promoted.
- A failure in any component fails the coordinated release.
- Frontend, API, and database each need an explicit rollback or recovery path.
- Cross-provider networking, secrets, TLS, CORS, observability, latency, and egress must be reviewed.
- Deployment remains manual or protected-environment controlled; the advisor never deploys automatically.

### Deployment advisor

Run:

```bash
npm run deployment:advise
```

The advisor compares topology and provider fit using:

- frontend and API runtime compatibility
- PostgreSQL requirements
- prototype, pilot, or production stage
- commercial use
- expected traffic and bandwidth
- cold-start tolerance
- preview deployment needs
- edge execution
- background jobs
- regional and data-residency constraints
- database recovery requirements
- cross-provider complexity
- stated monthly budget

Current optional deployment adapter identifiers include:

- `deploy-cloudflare`
- `deploy-netlify`
- `deploy-vercel`
- `deploy-render`
- `database-neon`
- `database-supabase`
- `database-render-postgres`
- `database-managed-postgres`

Provider-specific CLI tools and configuration are added only after an approved slice selects the provider.

### Planned deployment wizard

A future optional command may provide an interactive setup:

```bash
npm run deployment:init
```

The wizard would ask about runtime, topology preference, database, budget, region, traffic, cold starts, background jobs, recovery expectations, and preview deployments; then generate a reviewed profile. It would still require explicit human approval and would not provision infrastructure automatically.

Full guidance: `docs/integrations/DEPLOYMENT-COST.md`.

## Cost controls

- deterministic validation before model-backed review
- focused slice context instead of full-repository context
- MemPalace local retrieval for large, recurring context when enabled
- coherent implementation steps
- single-agent execution for low-risk work
- subagents only when risk justifies their cost
- capped attempts and CI repair cycles
- full certification only when a slice is ready
- NotebookLM export only after material documentation changes
- Caveman disabled by default and limited to `lite`
- context compression only after measured recurring input cost and human approval
- deployment providers compared by workload and total cost drivers, not headline free-tier price
- no provider provisioning or deployment from the advisor

## Loop Engineering controls

- `.engineering/STATE.json` — durable current state
- `.engineering/RUN_LOG.jsonl` — append-only run history
- `.engineering/BUDGET.yaml` — retry and agent limits
- `.engineering/GATES.yaml` — protected paths and human gates
- `.engineering/POLICY.yaml` — architecture and execution defaults
- `.engineering/GROWTH-RULES.yaml` — evidence-based upgrade recommendations
- `.engineering/PROFILE.yaml` — modes and optional plugin declarations

## Default skills

Repository-local governance skills live under `.agents/skills/`:

- product and technical intake
- security intake
- requirement normalization
- architecture baseline and review
- project and slice planning
- UI review
- evidence building
- release verification
- `using-superpowers` for the default implementation methodology
- `design-taste-frontend` for suitable marketing/editorial and approved redesign surfaces

Superpowers supplies lower-level execution skills such as brainstorming, plans, worktrees, TDD, execution, debugging, review, verification, and branch completion.

## UI workflow

Use the approved product design baseline first, then only relevant installed UI skills:

1. Taste Skill for suitable visual-direction work.
2. UI UX Pro Max for product workflows and accessibility.
3. Impeccable for bounded polish.
4. Emil design engineering for purposeful motion.
5. Ponytail for maintainable implementation.
6. Superpowers for planning, implementation, and review.

Taste Skill is installed at `.agents/skills/design-taste-frontend/SKILL.md` and must not override approved requirements, accessibility, design baselines, or slice scope.

## Security model

Every relevant PR should use deterministic secret scanning, dependency validation, authorization tests, security headers, and protected-path rules.

Codex Security is optional and risk-triggered for authentication, authorization, payments, uploads, webhooks, sensitive persistence, migrations, and release candidates.

```bash
npm install --save-dev @openai/codex-security
npx @openai/codex-security login
npx @openai/codex-security scan .
```

High and critical findings require human review. Agents must not silently suppress findings.

## Main commands

```bash
npm run product:intake
npm run planning:generate
npm run planning:validate
npm run slice:activate -- VS-01
npm run slice:status
npm run slice:validate
npm run security:classify -- <changed-files>
npm run delivery:status
npm run deployment:advise
npm run knowledge:export
npm run memory:doctor
npm run optimize:context
npm run preflight
npm run certify
npm run engineering:advise
npm run profile:show
```

## Large requirements

Parse the full product once, plan broadly at release and milestone level, detail only the next milestone, and execute only the active slice. Generate focused context packs under `delivery/context/<slice-id>/`. MemPalace may retrieve relevant historical context, but every retrieved item must be validated against current Git sources.

```text
Product → Release → Milestone → Epic → Vertical Slice → Context Retrieval → Superpowers Plan → Task
```

## GitHub setup

1. Protect `main` and require pull requests.
2. Require appropriate CI checks.
3. Create a protected `production` environment with human reviewers.
4. Store deployment and security credentials in GitHub secrets.
5. Enable Dependabot and secret scanning where available.
6. Keep production release manually initiated and exact-SHA verified.

## Deliberate exclusions

No microservice generation, Kubernetes default, event sourcing default, generic repositories, uncontrolled agent swarms, autonomous merge, autonomous production deployment, custom project-management UI, mandatory deployment provider, or mandatory Ruflo dependency.

Superpowers is the default execution methodology. NotebookLM, MemPalace, Caveman, and deployment adapters are removable, non-authoritative, optional integrations.

## License

MIT — see [LICENSE](LICENSE).
