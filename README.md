# Product Engineering Starter

An open-source, governed starter for turning an approved **PRD** and **TRD** into a traceable, secure, cost-controlled web product.

It combines vertical-slice delivery, Loop Engineering-inspired state and budgets, deterministic CI, optional maker/checker verification, risk-triggered Codex Security, and human-controlled release gates.

## Default web stack

- Next.js + TypeScript frontend
- ASP.NET Core backend
- PostgreSQL + EF Core
- OpenAPI
- xUnit integration and architecture tests
- Playwright browser tests
- Docker Compose
- GitHub Actions

## Prerequisites

Install:

- Git 2.40+
- Node.js 24 LTS with npm
- .NET SDK 10.x
- Docker Desktop or Docker Engine with Compose v2
- Optional: GitHub CLI, PostgreSQL client, Python 3.10+ and Codex Security access

## Install from GitHub

### Recommended: GitHub template

Enable **Settings → Template repository**, then select **Use this template** and create a new repository.

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

## Start a product

1. Complete `product/PRD.md`.
2. Complete `product/TRD.md`.
3. Add design rules to `product/DESIGN.md`.
4. Define terminology in `product/GLOSSARY.md`.
5. Change PRD/TRD status from `Draft` only after review.
6. Run intake and planning.

```bash
npm run product:intake
npm run planning:generate
npm run planning:validate
npm run engineering:advise
```

The intake command blocks missing headings, unresolved draft status, and unsupported assumptions rather than inventing policy.

## Delivery workflow

```text
PRD + TRD
→ product, technical and security intake
→ source-linked requirements
→ architecture baseline and proposed ADRs
→ roadmap, milestones, epics and slices
→ human plan approval
→ activate one vertical slice
→ implement one bounded task
→ deterministic preflight
→ risk-triggered security review
→ independent verification when justified
→ certification evidence
→ human merge and exact-SHA release
```

Activate a slice after creating `docs/slices/VS-01.md` and linking approved requirement IDs in `delivery/current-slice.json`:

```bash
npm run slice:activate -- VS-01
npm run slice:status
npm run slice:validate
```

## Operating modes

The project starts in **Lite** mode.

- **Lite:** intake, planning, slices, deterministic validation, baseline security and human review.
- **Standard:** adds ADRs, threat modelling, evidence bundles and release certification.
- **Enterprise:** adds maker/checker separation, worktrees, agent budgets and risk-triggered Codex Security.

The active mode and plugins are declared in `.engineering/PROFILE.yaml`.

```bash
npm run profile:show
npm run engineering:advise
```

The advisor recommends capabilities based on project evidence. It never enables plugins or changes mode automatically.

## Loop Engineering controls

- `.engineering/STATE.json` — durable current state
- `.engineering/RUN_LOG.jsonl` — append-only run history
- `.engineering/BUDGET.yaml` — retry and agent limits
- `.engineering/GATES.yaml` — protected paths and human gates
- `.engineering/POLICY.yaml` — architecture and execution defaults
- `.engineering/GROWTH-RULES.yaml` — evidence-based upgrade recommendations

## Default skills

Repository-local skills live under `.agents/skills/`:

- product and technical intake
- security intake
- requirement normalization
- architecture baseline and review
- project and slice planning
- task decomposition
- implementation
- independent verification
- UI review
- CI triage
- evidence building
- release verification
- **Taste Skill (`design-taste-frontend`)** for landing pages, marketing surfaces, portfolios, editorial pages, and explicitly approved redesigns

Load only relevant skills for each task. A normal feature uses `slice-planner`, `implementer`, and `verifier`; a specialist is added only when triggered.

Taste Skill is installed locally at:

```text
.agents/skills/design-taste-frontend/SKILL.md
```

To install or update it from the maintained skill repository:

```bash
npx skills add https://github.com/ksazid/taste-skill --skill "design-taste-frontend"
```

Taste Skill must not override approved product requirements, design baselines, accessibility rules, or active-slice scope. It is not the primary skill for dashboards, dense data tables, administrative queues, complex forms, or multi-step product workflows.

## UI workflow

For UI work, use the approved product design baseline first, then project-installed UI skills as relevant:

1. **Taste Skill** for visual direction, layout, typography, spacing, hierarchy, and anti-template discipline on landing, marketing, portfolio, editorial, and approved redesign surfaces.
2. UI UX Pro Max for UX, accessibility, responsive behavior and states.
3. Impeccable for bounded visual polish.
4. Emil design engineering for purposeful motion and reduced-motion equivalents.
5. Ponytail for maintainable minimum-change implementation.

Taste Skill is vendored as a project-local integration. The other external UI skills are installed separately when required by a project.

## Security model

Every relevant PR should use deterministic checks such as secret scanning, dependency validation, authorization tests, security headers and protected-path rules.

Codex Security is optional and risk-triggered for authentication, authorization, payments, uploads, webhooks, sensitive persistence, migrations and release candidates.

```bash
npm install --save-dev @openai/codex-security
npx @openai/codex-security login
npx @openai/codex-security scan .
```

In CI, use `OPENAI_API_KEY` or `CODEX_API_KEY`. High and critical findings require human review; agents must not silently suppress findings.

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
npm run preflight
npm run certify
npm run engineering:advise
npm run profile:show
```

## Large requirements

For a large PRD/TRD, parse the whole product once, plan broadly at release and milestone level, detail only the next milestone, and execute only the active slice. Generate focused context packs under `delivery/context/<slice-id>/` rather than sending the whole repository to every agent.

Recommended hierarchy:

```text
Product → Release → Milestone → Epic → Vertical Slice → Task
```

## GitHub setup

After creating a project from the starter:

1. Protect `main` and require pull requests.
2. Require CI checks appropriate to the project.
3. Create a protected `production` environment with human reviewers.
4. Store deployment and Codex Security credentials in GitHub secrets.
5. Enable Dependabot and secret scanning where available.
6. Keep production release manually initiated and exact-SHA verified.

## Deliberate exclusions

No microservice generation, Kubernetes default, event sourcing default, generic repositories, large agent swarms, autonomous merge, autonomous production deployment, custom project-management UI, or mandatory Ruflo dependency.

Ruflo may be added later as an optional orchestration adapter only when measured project needs justify it.

## License

MIT — see [LICENSE](LICENSE).
