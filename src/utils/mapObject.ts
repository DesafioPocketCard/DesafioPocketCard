/* eslint-disable no-unused-vars */
type MapObjectFunction<T, R> = (value: T, label: string) => R;

function mapObject<T, R>(
  obj: Record<string, T>,
  fn: MapObjectFunction<T, R> = (value, label) => [] as unknown as R,
): R[] {
  if (!obj) return [];
  return Object.keys(obj).map((key: string) => fn(obj[key], key));
}

export default mapObject;
