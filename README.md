# Product Engineering Starter

An open-source governance layer for turning an approved **PRD** and **TRD** into a traceable, secure, cost-controlled web product.

Product Engineering Starter decides **what is approved and safe to build**. [Superpowers](https://github.com/obra/superpowers) is the default methodology for **how an approved slice is planned, implemented, reviewed, debugged, and finished**.

## What the starter provides

- PRD/TRD intake and conflict detection
- source-linked requirement normalization and traceability
- roadmap, milestones, epics, and vertical slices
- architecture and security governance
- focused slice context, allowed paths, and protected paths
- Loop Engineering-inspired durable state, budgets, gates, and run history
- deterministic preflight, risk-triggered Codex Security, and certification evidence
- human-controlled merge and exact-SHA production release

## What Superpowers provides

- feature-level brainstorming and design clarification
- detailed implementation plans
- isolated Git worktrees
- test-driven development
- plan execution or subagent-driven development
- specification-compliance and code-quality review
- systematic debugging and verification before completion
- branch completion and PR/merge choices

Superpowers does not replace the approved PRD, TRD, ADRs, security decisions, design baseline, active slice, certification, or release approval.

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

- Git 2.40+
- Node.js 24 LTS with npm
- .NET SDK 10.x
- Docker Desktop or Docker Engine with Compose v2
- A supported coding-agent harness for Superpowers
- Optional: GitHub CLI, PostgreSQL client, Python 3.10+, and Codex Security access

## Install the starter

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

Superpowers is installed separately in each coding-agent harness.

### Codex App or Codex CLI

Open the plugin interface, search for `Superpowers`, and install it from the official marketplace:

```text
/plugins
```

### Claude Code

```text
/plugin install superpowers@claude-plugins-official
```

### Cursor

```text
/add-plugin superpowers
```

For Antigravity, Factory Droid, Gemini CLI, GitHub Copilot CLI, Kimi Code, OpenCode, or Pi, follow the upstream installation guide in `obra/superpowers`.

The repository-local integration is documented at:

```text
.agents/skills/using-superpowers/SKILL.md
```

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
→ generate focused slice context
→ Superpowers brainstorming when clarification is needed
→ Superpowers writing-plans
→ worktree + TDD + implementation
→ spec-compliance and code-quality review
→ deterministic preflight
→ risk-triggered security review
→ certification evidence
→ human merge and exact-SHA release
```

Activate a slice after creating `docs/slices/VS-01.md` and linking approved requirement IDs in `delivery/current-slice.json`:

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

Superpowers may clarify implementation details, but it must not silently change approved scope or policy.

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

The project starts in **Lite** mode.

- **Lite:** intake, planning, slices, Superpowers single-agent execution, deterministic validation, baseline security, and human review.
- **Standard:** adds ADRs, threat modelling, evidence bundles, Superpowers worktrees/reviews, and release certification.
- **Enterprise:** adds budgeted subagent-driven development, independent security review, and risk-triggered Codex Security.

The active mode and plugins are declared in `.engineering/PROFILE.yaml`.

```bash
npm run profile:show
npm run engineering:advise
```

The advisor recommends capabilities based on project evidence. It never enables plugins or changes mode automatically.

## Cost controls

Superpowers can improve total delivery cost by reducing ad-hoc planning and rework, but subagents and repeated reviews can increase token use. The starter therefore applies these defaults:

- deterministic validation before model-backed review
- focused slice context rather than full-repository context
- coherent 10–30 minute implementation steps instead of unnecessary fragmentation
- single-agent execution for low-risk work
- subagents only when complexity or risk justifies them
- capped attempts and CI repair cycles
- no model call when the relevant state or commit SHA has not changed
- full certification only when a slice is ready

## Loop Engineering controls

- `.engineering/STATE.json` — durable current state
- `.engineering/RUN_LOG.jsonl` — append-only run history
- `.engineering/BUDGET.yaml` — retry and agent limits
- `.engineering/GATES.yaml` — protected paths and human gates
- `.engineering/POLICY.yaml` — architecture and execution defaults
- `.engineering/GROWTH-RULES.yaml` — evidence-based upgrade recommendations

These controls constrain Superpowers execution rather than duplicate it.

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
- **using-superpowers** for the default implementation methodology
- **Taste Skill (`design-taste-frontend`)** for landing pages, marketing surfaces, portfolios, editorial pages, and explicitly approved redesigns

Superpowers supplies the lower-level execution skills such as brainstorming, writing plans, worktrees, TDD, executing plans, subagent-driven development, debugging, review, verification, and branch completion.

## UI workflow

Use the approved product design baseline first, then only the relevant installed UI skills:

1. **Taste Skill** for visual direction and anti-template discipline on landing, marketing, portfolio, editorial, and approved redesign surfaces.
2. UI UX Pro Max for product workflows, accessibility, responsive behavior, forms, and states.
3. Impeccable for bounded visual polish.
4. Emil design engineering for purposeful motion and reduced-motion equivalents.
5. Ponytail for maintainable minimum-change implementation.
6. Superpowers for planning, implementation, review, and verification.

Taste Skill is installed locally at:

```text
.agents/skills/design-taste-frontend/SKILL.md
```

Update it with:

```bash
npx skills add https://github.com/ksazid/taste-skill --skill "design-taste-frontend"
```

Taste Skill must not override approved product requirements, accessibility rules, design baselines, or active-slice scope. It is not the primary skill for dashboards, tables, administrative queues, complex forms, or multi-step workflows.

## Security model

Every relevant PR should use deterministic checks such as secret scanning, dependency validation, authorization tests, security headers, and protected-path rules.

Codex Security is optional and risk-triggered for authentication, authorization, payments, uploads, webhooks, sensitive persistence, migrations, and release candidates.

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

For a large PRD/TRD, parse the whole product once, plan broadly at release and milestone level, detail only the next milestone, and execute only the active slice. Generate focused context packs under `delivery/context/<slice-id>/` rather than sending the whole product history to every agent.

```text
Product → Release → Milestone → Epic → Vertical Slice → Superpowers Plan → Task
```

## GitHub setup

1. Protect `main` and require pull requests.
2. Require appropriate CI checks.
3. Create a protected `production` environment with human reviewers.
4. Store deployment and Codex Security credentials in GitHub secrets.
5. Enable Dependabot and secret scanning where available.
6. Keep production release manually initiated and exact-SHA verified.

## Deliberate exclusions

No microservice generation, Kubernetes default, event sourcing default, generic repositories, uncontrolled agent swarms, autonomous merge, autonomous production deployment, custom project-management UI, or mandatory Ruflo dependency.

Superpowers is the default execution methodology; Ruflo remains unnecessary unless future measured requirements justify a separate orchestration runtime.

## License

MIT — see [LICENSE](LICENSE).
