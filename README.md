# Bricks Gold Insights - Custom Databricks App

Governed Custom Databricks App starter with a working example: visualize gold-layer Bricks medallion metrics from Unity Catalog through a React + AppKit dashboard.

**Stack:** React 19 · AppKit Analytics · Unity Catalog · SQL Warehouse · Asset Bundles · Cursor agent governance

---

## From data source to a working app — fast and responsible

This starter compresses the path from governed UC tables to a deployed dashboard. Security and spec discipline are built in so you can iterate quickly **without** redoing access controls, query contracts, or agent guardrails on every change.

```
Unity Catalog (gold tables)
        ↓
config/queries/*.sql          ← governed read layer (one file per metric/view)
        ↓
AppKit server + React UI      ← typed analytics API + pages
        ↓
npm run dev / smoke tests     ← local feedback in minutes
        ↓
databricks apps deploy        ← bundle carries UC grants + warehouse binding
        ↓
End users on a live app
```

| Stage | What you do | Why it stays fast |
|-------|-------------|-------------------|
| **1. Data** | Point at existing gold tables in UC (`databricks.yml` SELECT grants) | No new warehouse endpoints; reads stay in SQL files |
| **2. Queries** | Add or edit `config/queries/*.sql` | Backend persona owns one layer; UI consumes stable shapes |
| **3. UI** | Wire charts/KPIs in `client/src/` | AppKit analytics pattern; smoke tests catch regressions early |
| **4. Spec task** | One task per agent session (`.cursor/specs/tasks.md`) | Small diffs, clear persona scope, less rework |
| **5. Ship** | `validate` → `deploy` via Asset Bundle | Permissions travel with the app; no manual grant drift |

**Iteration loop:** define the end-user outcome in a spec → implement one task → run locally → validate → deploy. Governance (`SECURITY.md`, `AGENTS.md`, specs) narrows what agents may touch, so each cycle targets user value instead of policy cleanup.

The included **Bricks Gold Insights** example is the full loop already wired: three gold tables, six queries, Overview + Analytics pages, and bundle deploy config.

---

## Quick start (local dev)

**Prerequisites:** Python venv at repo root, Node.js, Databricks CLI authenticated, access to `bricks_medallion.gold-bricks`.

```bash
# 1. Activate environment
source .venv/bin/activate

# 2. Configure the app (copy and edit)
cd bricks-gold-insights
cp .env.example .env

# 3. Install and run
npm install
npm run dev
```

Open **http://localhost:8000**

---

## Deploy

```bash
source .venv/bin/activate
cd bricks-gold-insights

npm run build
databricks apps validate -t default --skip-tests
databricks apps deploy -t default
```

Before deploy: SQL warehouse is running, `sql_warehouse_id` is set in `databricks.yml`, and UC `SELECT` grants are declared in the bundle.

---

## What you get

| Area | Details |
|------|---------|
| **Overview** | Hero KPIs and data-source cards |
| **Analytics** | Markets (users/revenue by country), host explorer, payment leaderboard |
| **Data** | `country_metrics`, `host_property_summary`, `user_payment_summary` in `bricks_medallion.gold-bricks` |
| **Queries** | 6 typed SQL files in `config/queries/` — the API layer |
| **Security** | SELECT-only UC grants in `databricks.yml`; no secrets in repo |

---

## Project layout

```
databricks-app/                    # Governance + agent tooling
├── AGENTS.md                      # Persona boundaries
├── SECURITY.md                    # Non-negotiable security policy
├── plan.md                        # Phased roadmap
├── bootstrap_prompt.txt           # One-time governance bootstrap
├── good-practices-spec-driven.txt # SDD + security reference
├── .cursor/
│   ├── rules/                     # Cursor agent rules
│   ├── skills/                    # Databricks agent skills
│   └── specs/                     # Feature specs and tasks
├── .venv/                         # Python virtual environment (local only)
└── bricks-gold-insights/          # AppKit application
    ├── client/src/                # React UI
    ├── config/queries/            # Governed SQL
    ├── server/                    # AppKit server
    ├── shared/                    # Shared TypeScript types
    ├── databricks.yml             # Bundle + UC permissions
    ├── app.yaml                   # App runtime manifest
    └── tests/smoke.spec.ts        # Playwright smoke tests
```

---

## Spec-driven development (agents)

This repo is a **governance-first Cursor starter**. Write specs before code; execute one persona-scoped task per agent session.

### Bootstrap (once)

```
Read bootstrap_prompt.txt and good-practices-spec-driven.txt.
Scaffold governance artifacts in dependency order.
Do not implement application features during bootstrap.
```

### Build a feature

1. Generate a spec from `.cursor/specs/_template.md`
2. Implement **one task at a time** in a fresh session:

```
Read .cursor/specs/[feature-name].md and implement T1.
Confirm persona. Respect MCP/shell/UC allowlist. Run verify and security verify.
```

Wrong persona or policy conflict → **stop** and escalate.

### Personas

| Persona | Owns |
|---------|------|
| Orchestrator | Persona-task alignment |
| Frontend | `client/**`, smoke tests |
| Backend | `server/**`, `config/queries/**` |
| Unity Catalog | `sql/uc/**` (DDL, grants) |
| Platform/Infra | `databricks.yml`, `app.yaml`, bundles |
| Security Reviewer | Pre-merge threat review |

Governance chain: `SECURITY.md` → `AGENTS.md` → `plan.md` → `.cursor/specs/` → application code.

---

## Security essentials

- No PATs, keys, or secrets in repo, prompts, or logs
- Least-privilege UC grants; Unity Catalog persona owns all DDL/grant changes
- SQL reads via `config/queries/` — no custom warehouse endpoints for SELECT
- MCP and shell access only when a task explicitly allowlists them

---

## License

MIT
