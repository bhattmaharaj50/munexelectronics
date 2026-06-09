---
name: Storage backend detection
description: How to correctly detect whether Replit Object Storage is available vs DB fallback
---

Use `REPLIT_SIDECAR_ENDPOINT` env var to detect if Replit Object Storage is provisioned.
`REPL_ID` is always set in Replit but Object Storage may not be — the sidecar at `http://127.0.0.1:1106`
is only available when Object Storage is provisioned for the project.

**Why:** Using `REPL_ID` causes uploads to fail with `A bucket name is needed` when Object Storage
isn't provisioned, even though the DB fallback would work fine.

**How to apply:** In `lib/storage.ts` `getStorageBackend()`:
```
if (process.env.REPLIT_SIDECAR_ENDPOINT || process.env.PUBLIC_OBJECT_SEARCH_PATHS) return "replit"
return "db"  // always works, no provisioning needed
```
