export type UniqueKeySelector<TValue, TKey> = (
  value: TValue,
  index: number,
  values: readonly TValue[],
) => TKey;

/**
 * Returns the first value for each derived key in stable order.
 */
export function uniqueBy<TValue, TKey>(
  values: readonly TValue[],
  selectKey: UniqueKeySelector<TValue, TKey>,
): TValue[] {
  const keys = new Set<TKey>();
  const result: TValue[] = [];

  values.forEach((value, index) => {
    const key = selectKey(value, index, values);
    if (!keys.has(key)) {
      keys.add(key);
      result.push(value);
    }
  });

  return result;
}
