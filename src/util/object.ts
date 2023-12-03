export const isPOJO = (x: unknown) =>
  x === Object(x) &&
  !Array.isArray(x) &&
  typeof x !== 'function' &&
  typeof x !== 'symbol' &&
  Object.getPrototypeOf(x) === Object.prototype

export const walkObjectLeafNodes = (
  obj: unknown,
  fn: (key: string, value: string | unknown) => void,
) => {
  Object.keys(obj).forEach((key: string) => {
    const value: string | unknown = obj[key]
    if (!isPOJO(value)) return fn(key, value)
    return walkObjectLeafNodes(value, fn)
  })
}
