export const isPOJO = (x) =>
  x === Object(x) &&
  !Array.isArray(x) &&
  typeof x !== 'function' &&
  typeof x !== 'symbol' &&
  Object.getPrototypeOf(x) === Object.prototype

export const walkObjectLeafNodes = (obj, fn) => {
  Object.keys(obj).forEach((key) => {
    const value = obj[key]
    if (!isPOJO(value)) return fn(key, value)
    return walkObjectLeafNodes(value, fn)
  })
}
