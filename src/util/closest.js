import {
  all,
  compose,
  curry,
  equals,
  filter,
  includes,
  map,
  reduce,
  toLower,
  without,
} from 'ramda'
import levenshtein from 'js-levenshtein'
import { clean } from './clean'

export const findMatches = curry((matchers, xs, x) => {
  const f = compose(
    filter((y) => y.score !== undefined && y.score > 0),
    map((y) => {
      const r = (acc, { f, n }) => (f(x, y) ? acc + n : acc)
      return { ...y, score: reduce(r, 0, matchers) }
    }),
    filter((y) => !isDuplicate(x, y)),
    without([x]),
  )

  return { ...x, matches: f(xs) }
})

export const isDuplicate = (a, b) =>
  a.code !== b.code &&
  clean(a.namesake) === clean(b.namesake) &&
  a.district === b.district

export const matchNamesakeOnHighPopulation =
  (threshold) => (_a, b) => {
    if (!b.population) return false
    return b.population >= threshold
  }

export const matchNamesakeOnStartingWithCode = (a, b) => {
  const code = clean(a.code)
  const namesake = clean(b.namesake)

  return namesake.startsWith(code)
}

export const matchNamesakeOnFirstLetterOfCode = (a, b) => {
  const code = clean(a.code)
  const namesake = clean(b.namesake)

  return code[0] === namesake[0]
}

export const matchNamesakeOnContainingCodeInOrder = (
  a,
  b,
) => {
  const letters = toLower(a.code).split('')
  const namesake = clean(b.namesake)

  const reString = reduce(
    (acc, curr) => acc + curr + '.*',
    '.*',
    letters,
  )
  const re = new RegExp(reString)

  return re.test(namesake)
}

export const matchNamesakeOnContainingCodeNotInOrder = (
  a,
  b,
) => {
  const letters = toLower(a.code).split('')
  const namesake = clean(b.namesake)

  const includedInNamesake = (letter) =>
    includes(letter, namesake)
  const bools = map(includedInNamesake, letters)
  return all(equals(true), bools)
}

export const matchNamesakeOnNamesakeLevenshtein =
  (n) => (a, b) =>
    levenshtein(clean(a.namesake), clean(b.namesake)) <= n
