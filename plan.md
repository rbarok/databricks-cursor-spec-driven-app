# Bricks Gold Insights — Development Plan

## Goal

Deploy a governed Databricks App that visualizes gold-layer Bricks medallion metrics from Unity Catalog.

## Constraints

### Must
- Read only from `bricks_medallion.gold-bricks` (country_metrics, host_property_summary, user_payment_summary)
- Use AppKit analytics pattern (SQL files + React UI)
- Deploy via Asset Bundle (`databricks apps deploy`)

### Must Not
- UC DDL from Frontend/Backend personas
- Secrets in repo
- Bulk PII export beyond dashboard scope

### Out of Scope
- Write-back to UC tables
- Cross-workspace federation
- Genie chat interface

## Phases

| Step | Persona | Deliverable | Depends on |
|------|---------|-------------|------------|
| 1 | Platform/Infra | Scaffold AppKit app under `/bricks-gold-insights` + bundle config | — |
| 2 | Backend | SQL queries for gold tables | 1 |
| 3 | Frontend | Dashboard UI + smoke tests | 2 |
| 4 | Platform/Infra | Validate and deploy | 3 |
| 5 | Security Reviewer | Pre-deploy security check | 4 |
