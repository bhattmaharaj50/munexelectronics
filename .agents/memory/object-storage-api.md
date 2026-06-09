---
name: Object Storage API methods
description: Correct method names for @replit/object-storage Client
---

The `@replit/object-storage` npm package Client has these methods:
- `uploadFromBytes(name, bytes, { contentType })` → `{ ok, error }`
- `downloadAsBytes(name)` → `{ ok, value: Uint8Array, error }`
- `delete(name)` → `{ ok, error }`
- `list({ prefix })` → `{ ok, value: [{ name, size }], error }`
- Also: `uploadFromText`, `uploadFromFilename`, `uploadFromStream`, `downloadAsText`, `exists`

**NOT** `uploadFromBuffer` or `downloadAsBuffer` — those don't exist.

The client auto-discovers bucket via `REPLIT_SIDECAR_ENDPOINT/object-storage/default-bucket`.
`new Client()` succeeds but first operation fails if sidecar isn't running.
