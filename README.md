# `@lucid-softworks/array-unique-by`

Deduplicate array values by a derived key while keeping the first value for
each key.

```ts
import { uniqueBy } from "@lucid-softworks/array-unique-by";

uniqueBy(
  [
    { id: 1, name: "first" },
    { id: 1, name: "second" },
  ],
  (value) => value.id,
);
// [{ id: 1, name: "first" }]
```

Keys use `Set` equality semantics and may be primitives or objects. The
selector receives the value, index, and original readonly array.
