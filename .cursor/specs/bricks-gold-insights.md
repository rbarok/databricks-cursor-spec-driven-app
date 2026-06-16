# Bricks Gold Insights Dashboard

## Why

Operators need a governed view of Bricks gold-layer metrics (countries, hosts, payments) without ad-hoc SQL.

## What

Databricks AppKit dashboard reading `bricks_medallion.gold-bricks` materialized views with KPIs, charts, and filterable tables.

## Constraints

### Must
- AppKit analytics plugin with SQL warehouse
- SELECT-only access on three gold tables
- Smoke tests updated for custom UI

### Must Not
- Custom warehouse endpoints for SELECT queries
- Log user PII from user_payment_summary

### Out of Scope
- CRUD / Lakebase
- Genie NL queries

## Security (MITRE ATLAS)

| Technique | ID | Control |
|-----------|-----|---------|
| Privilege Escalation | AML.TA0012 | SELECT grants on gold tables only |
| Credential Access | AML.TA0013 | Warehouse ID via bundle vars, not hardcoded in source |
| Collection | AML.TA0009 | LIMIT 100 on detail tables; aggregated KPIs only |

### MCP & Shell Policy
- MCP allowlist: none
- Shell: `npm run *`, `databricks apps validate`, `databricks apps deploy`
- UC scope: `bricks_medallion.gold-bricks.*`
- Environment: dev workspace

## Data Classification

| Table | Classification |
|-------|----------------|
| country_metrics | internal |
| host_property_summary | internal |
| user_payment_summary | confidential |

## Tasks

See `.cursor/specs/tasks.md` for implementation tasks.

## Validation

- `databricks apps validate` passes
- Home and Analytics pages load with KPI data
- Deploy with `databricks apps deploy -t default`
