import { describe, expect, expectTypeOf, it, vi } from "vitest";

import { uniqueBy } from "../src/index.js";

describe("uniqueBy", () => {
  it("keeps the first value for each key in stable order", () => {
    const values = [
      { id: 2, name: "first two" },
      { id: 1, name: "one" },
      { id: 2, name: "second two" },
    ];

    expect(uniqueBy(values, (value) => value.id)).toEqual([
      values[0],
      values[1],
    ]);
  });

  it("compares object keys by identity", () => {
    const shared = { key: true };
    const values = [
      { key: shared, value: 1 },
      { key: { key: true }, value: 2 },
      { key: shared, value: 3 },
    ];

    expect(uniqueBy(values, (value) => value.key)).toEqual([
      values[0],
      values[1],
    ]);
  });

  it("passes the index and original readonly input", () => {
    const values = ["a", "b"] as const;
    const selectKey = vi.fn<
      (value: "a" | "b", index: number, input: readonly ("a" | "b")[]) => number
    >((_value, index) => index);

    const result = uniqueBy(values, selectKey);

    expect(selectKey).toHaveBeenNthCalledWith(1, "a", 0, values);
    expect(selectKey).toHaveBeenNthCalledWith(2, "b", 1, values);
    expect(values).toEqual(["a", "b"]);
    expectTypeOf(result).toEqualTypeOf<("a" | "b")[]>();
  });

  it("handles empty input", () => {
    expect(uniqueBy([], String)).toEqual([]);
  });
});
