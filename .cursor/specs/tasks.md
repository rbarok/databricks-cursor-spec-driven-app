# Implementation Tasks — Bricks Gold Insights

### T1: Scaffold AppKit analytics app
**Persona:** Platform/Infra
**Status:** done
**Depends on:** —
**What:** AppKit app with analytics plugin and bundle config
**Files:** `/bricks-gold-insights/**`
**UC objects:** none
**Must Not:** commit `.env`
**MCP/Shell:** `databricks apps init`
**Verify:** `ls /bricks-gold-insights/app.yaml`
**Security verify:** no secrets in scaffolded files

### T2: Add SQL queries for gold tables
**Persona:** Backend
**Status:** done
**Depends on:** T1
**What:** SQL files querying gold-bricks views
**Files:** `/bricks-gold-insights/config/queries/*.sql`
**UC objects:** bricks_medallion.gold-bricks.*
**Must Not:** custom SELECT endpoints in server.ts
**MCP/Shell:** `npm run typegen`
**Verify:** `npm run typegen` shows all queries ✓
**Security verify:** queries use LIMIT on detail tables

### T3: Build dashboard UI
**Persona:** Frontend
**Status:** done
**Depends on:** T2
**What:** Home + Analytics pages with KPIs, charts, tables
**Files:** `/bricks-gold-insights/client/src/**`, `tests/smoke.spec.ts`
**UC objects:** none (read via analytics plugin)
**Must Not:** double-fetch with useAnalyticsQuery + chart components on same key unnecessarily
**MCP/Shell:** none
**Verify:** `npm run typecheck`
**Security verify:** no UC credentials in client code

### T4: Validate and deploy
**Persona:** Platform/Infra
**Status:** pending
**Depends on:** T3
**What:** Run validate; deploy to workspace
**Files:** `databricks.yml`
**UC objects:** bricks_medallion.gold-bricks.*
**Must Not:** deploy without user consent
**MCP/Shell:** `databricks apps validate`, `databricks apps deploy -t default`
**Verify:** validate exits 0; app status RUNNING
**Security verify:** UC table resources declare SELECT permission
