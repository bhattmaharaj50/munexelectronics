---
name: Admin credentials on fresh DB
description: What happens on first DB init and how to set the correct password
---

On a fresh DB (schema v0→v3 full reset), the admin account is seeded with:
- username: `admin`
- password: `munex2024` (or SEED_ADMIN_PASSWORD env var)
- `must_change_password: true` — blocks dashboard access, redirects to /admin/change-password

To set the correct password and clear the flag run:
```js
const bcrypt = require('bcryptjs');
const hash = bcrypt.hashSync('Munex@2026!', 10);
pool.query('UPDATE admin_users SET password_hash=$1, must_change_password=false WHERE username=$2', [hash,'admin'])
```

The replit.md says `Munex@2026!` is the current password — this is true only after the above script runs.
