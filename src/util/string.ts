export const splitByBoldStar = (s: string) => {
  const xs = []

  let i = 0
  while (i < s.length) {
    if (s[i] === '*') {
      // strong
      if (xs.length && xs[xs.length - 1].tag === 'strong') {
        // continue existing
        xs[xs.length - 1].str += s[i + 1]
      } else {
        // create new
        xs.push({ str: s[i + 1], tag: 'strong' })
      }
      i += 3
    } else {
      // span
      if (xs.length && xs[xs.length - 1].tag === 'span') {
        // continue existing
        xs[xs.length - 1].str += s[i]
      } else {
        // create new
        xs.push({ str: s[i], tag: 'span' })
      }
      i += 1
    }
  }

  return xs
}
