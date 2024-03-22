export const splitByBoldStar = (s) => {
  const xs = []

  let i = 0
  while (i < s.length) {
    if (s[i] === '*') {
      if (xs.length && xs[xs.length - 1].tag === 'mark') {
        xs[xs.length - 1].str += s[i + 1]
      } else {
        xs.push({ str: s[i + 1], tag: 'mark' })
      }
      i += 3 // Correctly skip over '*' and the character after it
    } else {
      if (xs.length && xs[xs.length - 1].tag !== 'mark') {
        xs[xs.length - 1].str += s[i]
      } else {
        xs.push({ str: s[i], tag: '' }) // Omitting 'span' but keeping text grouping
      }
      i += 1
    }
  }

  return xs
}
