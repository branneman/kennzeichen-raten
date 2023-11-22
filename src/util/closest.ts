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
import { AreaCode } from '../types/area-codes'
import { clean } from './clean'

export type Matcher = { f: MatcherFn; n: number }
export type MatcherFn = (
  x: AreaCode,
  y: AreaCode,
) => boolean

export const findMatches = curry(
  (matchers: Matcher[], xs: AreaCode[], x: AreaCode) => {
    const f = compose(
      filter(
        (y: AreaCode) =>
          y.score !== undefined && y.score > 0,
      ),
      map((y: AreaCode) => {
        const r = (acc: number, { f, n }: Matcher) =>
          f(x, y) ? acc + n : acc
        return { ...y, score: reduce(r, 0, matchers) }
      }),
      without([x]),
    )

    return { ...x, matches: f(xs) }
  },
)

export const matchNamesakeOnHighPopulation =
  (threshold: number) => (_a: AreaCode, b: AreaCode) => {
    if (!b.population) return false
    return b.population >= threshold
  }

export const matchNamesakeOnStartingWithCode = (
  a: AreaCode,
  b: AreaCode,
) => {
  const code = clean(a.code)
  const namesake = clean(b.namesake)

  return namesake.startsWith(code)
}

export const matchNamesakeOnFirstLetterOfCode = (
  a: AreaCode,
  b: AreaCode,
) => {
  const code = clean(a.code)
  const namesake = clean(b.namesake)

  return code[0] === namesake[0]
}

export const matchNamesakeOnContainingCodeInOrder = (
  a: AreaCode,
  b: AreaCode,
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
  a: AreaCode,
  b: AreaCode,
) => {
  const letters = toLower(a.code).split('')
  const namesake = clean(b.namesake)

  const includedInNamesake = (letter: string) =>
    includes(letter, namesake)
  const bools = map(includedInNamesake, letters)
  return all(equals(true), bools)
}

export const matchNamesakeOnNamesakeLevenshtein =
  (n: number) => (a: AreaCode, b: AreaCode) =>
    levenshtein(clean(a.namesake), clean(b.namesake)) <= n
