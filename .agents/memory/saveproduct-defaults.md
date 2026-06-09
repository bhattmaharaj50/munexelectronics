---
name: saveProduct rating bug
description: products table has NOT NULL on rating and reviews; must supply defaults
---

The `products` table schema has `rating NUMERIC NOT NULL DEFAULT 4.5` and `reviews INTEGER NOT NULL DEFAULT 0`
but these defaults only apply to bare INSERT without the columns. The `saveProduct` function explicitly
passes both columns so they must be non-null.

**Why:** New products created from the admin form don't include rating/reviews so they come in as
`undefined`, causing `null value in column "rating" violates not-null constraint`.

**How to apply:** In `lib/db.ts` saveProduct params array use `product.rating ?? 4.5` and `product.reviews ?? 0`.
