# Security Policy — unity-catalog-app

## Scope

Unity Catalog assets in `bricks_medallion`, Databricks Apps runtime, workspace credentials, and agent session boundaries.

## Assets & Trust Boundaries

| Asset | Classification | Access |
|-------|----------------|--------|
| `bricks_medallion.gold-bricks.country_metrics` | internal | SELECT via app SP |
| `bricks_medallion.gold-bricks.host_property_summary` | internal | SELECT via app SP |
| `bricks_medallion.gold-bricks.user_payment_summary` | confidential | SELECT via app SP (no PII export) |
| SQL Warehouse | infrastructure | CAN_USE via app SP |
| App service principal | credential | OAuth only; no keys in repo |

## ATLAS Controls (Relevant)

| Technique | ID | Control |
|-----------|-----|---------|
| Privilege Escalation | AML.TA0012 | SELECT-only UC grants; no DDL from app |
| Credential Access | AML.TA0013 | No PATs/SP keys in repo, logs, or prompts |
| AI Agent Tool Invocation | AML.T0053 | MCP allowlist: `project-0-databricks-app-databricks` only when task-approved |
| Exfiltration | AML.TA0010 | No bulk PII dumps; aggregated dashboard only |
| Execution | AML.TA0005 | Hooks block destructive UC DDL outside Unity Catalog persona |

## Must

- Least-privilege UC grants (SELECT on gold-bricks views/tables only)
- Environment separation: dev workspace only unless task targets prod
- Pin dependencies; no unreviewed packages
- Redact secrets in logs and agent handoffs

## Must Not

- Commit `.env`, PATs, tokens, or connection strings
- Run UC DDL from Backend/Frontend personas
- Grant ALL PRIVILEGES on production catalogs
- Expose raw user PII beyond task scope

## MCP & Shell Policy

- **Default MCP allowlist:** none (task must explicitly allow)
- **Shell:** `databricks apps validate`, `databricks apps deploy`, `npm run *`, `pytest` (task-scoped)
- **UC scope:** `bricks_medallion.gold-bricks` (read only)

## Incident Response

1. Secret committed → rotate credential, revoke, purge per org policy
2. Hook fired → stop agent, preserve logs, escalate to human
3. UC grant misconfiguration → revoke excess grants, audit query history

## Pre-Merge Checklist

- [ ] No secrets in diff
- [ ] UC grants are SELECT-only
- [ ] Persona boundaries respected
- [ ] Smoke tests pass
