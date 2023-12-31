import { describe, it, expect } from 'vitest'
import {
  findMatches,
  isDuplicate,
  matchNamesakeOnHighPopulation,
  matchNamesakeOnStartingWithCode,
  matchNamesakeOnFirstLetterOfCode,
  matchNamesakeOnContainingCodeInOrder,
  matchNamesakeOnContainingCodeNotInOrder,
  matchNamesakeOnNamesakeLevenshtein,
} from './closest'

describe('findMatches()', () => {
  const xs = [
    {
      code: 'WT',
      namesake: '*W*aldshu*t*',
      district: 'Waldshut',
    },
    {
      code: 'WTL',
      namesake: '*W*i*tt*lage',
      district: 'Wittlage',
    },
    {
      code: 'WTM',
      namesake: '*W*i*t*t*m*und',
      district: 'Wittmund',
    },
    {
      code: 'WÜ',
      namesake: '*Wü*rzburg',
      district: 'Würzburg',
    },
    {
      code: 'WÜM',
      namesake: '*W*ald*m**ü*nchen',
      district: 'Waldmünchen',
    },
  ]

  describe('with one matcher', () => {
    it('correct matches on WT', () => {
      const matchers = [
        {
          f: matchNamesakeOnContainingCodeNotInOrder,
          n: 10,
        },
      ]

      const r = findMatches(matchers, xs, xs[0])

      expect(r).toEqual({
        code: 'WT',
        namesake: '*W*aldshu*t*',
        district: 'Waldshut',
        matches: [
          {
            code: 'WTL',
            namesake: '*W*i*tt*lage',
            district: 'Wittlage',
            score: 10,
          },
          {
            code: 'WTM',
            namesake: '*W*i*t*t*m*und',
            district: 'Wittmund',
            score: 10,
          },
        ],
      })
    })

    it('correct matches on WÜ', () => {
      const matchers = [
        {
          f: matchNamesakeOnContainingCodeNotInOrder,
          n: 10,
        },
      ]

      const r = findMatches(matchers, xs, xs[3])

      expect(r).toEqual({
        code: 'WÜ',
        namesake: '*Wü*rzburg',
        district: 'Würzburg',
        matches: [
          {
            code: 'WÜM',
            namesake: '*W*ald*m**ü*nchen',
            district: 'Waldmünchen',
            score: 10,
          },
        ],
      })
    })
  })
})

describe('isDuplicate()', () => {
  const xs = [
    {
      code: 'AP',
      namesake: '*A**p*olda',
      district: 'Weimarer Land',
    },
    {
      code: 'APD',
      namesake: '*A**p*ol*d*a',
      district: 'Weimarer Land',
    },
    {
      code: 'WÜ',
      namesake: '*Wü*rzburg',
      district: 'Würzburg',
    },
    {
      code: 'WÜM',
      namesake: '*W*ald*m**ü*nchen',
      district: 'Waldmünchen',
    },
  ]

  it('detects duplicates insensitive to *', () => {
    expect(isDuplicate(xs[0], xs[1])).toEqual(true)
    expect(isDuplicate(xs[1], xs[0])).toEqual(true)

    expect(isDuplicate(xs[0], xs[2])).toEqual(false)
    expect(isDuplicate(xs[0], xs[3])).toEqual(false)
    expect(isDuplicate(xs[1], xs[2])).toEqual(false)
    expect(isDuplicate(xs[1], xs[3])).toEqual(false)
  })
})

describe('matchNamesakeOnHighPopulation()', () => {
  it('returns true on population over threshold', () => {
    const a = { code: '', namesake: '', district: '' }
    const b = {
      code: 'A',
      namesake: '*A*ugsburg',
      district: 'Augsburg',
      population: 550_000,
    }
    const f = matchNamesakeOnHighPopulation(500_000)
    expect(f(a, b)).toEqual(true)
  })

  it('returns false on population under threshold', () => {
    const a = { code: '', namesake: '', district: '' }
    const b = {
      code: 'H',
      namesake: '*H*annover',
      district: 'Hannover',
      population: 450_000,
    }
    const f = matchNamesakeOnHighPopulation(500_000)
    expect(f(a, b)).toEqual(false)
  })
})

describe('matchNamesakeOnStartingWithCode()', () => {
  const f = matchNamesakeOnStartingWithCode
  const xs = [
    {
      code: 'A',
      namesake: '*A*ugsburg',
      district: 'Augsburg',
    },
    {
      code: 'AH',
      namesake: '*Ah*aus',
      district: 'Ahaus',
    },
    {
      code: 'AW',
      namesake: '*A*hr*w*eiler',
      district: 'Ahrweiler',
    },
    {
      code: 'H',
      namesake: '*H*annover',
      district: 'Hannover',
    },
    {
      code: 'HA',
      namesake: '*Ha*gen',
      district: 'Hagen',
    },
  ]

  it('correct match', () => {
    expect(f(xs[0], xs[1])).toEqual(true)
    expect(f(xs[0], xs[2])).toEqual(true)

    expect(f(xs[3], xs[4])).toEqual(true)
    expect(f(xs[4], xs[3])).toEqual(true)
  })

  it('correct non-match', () => {
    expect(f(xs[0], xs[3])).toEqual(false)
    expect(f(xs[0], xs[4])).toEqual(false)

    expect(f(xs[3], xs[0])).toEqual(false)
    expect(f(xs[3], xs[1])).toEqual(false)
    expect(f(xs[3], xs[2])).toEqual(false)
  })
})

describe('matchNamesakeOnFirstLetterOfCode()', () => {
  const f = matchNamesakeOnFirstLetterOfCode
  const xs = [
    {
      code: 'A',
      namesake: '*A*ugsburg',
      district: 'Augsburg',
    },
    {
      code: 'AH',
      namesake: '*Ah*aus',
      district: 'Ahaus',
    },
    {
      code: 'AW',
      namesake: '*A*hr*w*eiler',
      district: 'Ahrweiler',
    },
    {
      code: 'H',
      namesake: '*H*annover',
      district: 'Hannover',
    },
    {
      code: 'HA',
      namesake: '*Ha*gen',
      district: 'Hagen',
    },
  ]

  it('correct match', () => {
    expect(f(xs[0], xs[1])).toEqual(true)
    expect(f(xs[0], xs[2])).toEqual(true)

    expect(f(xs[3], xs[4])).toEqual(true)
    expect(f(xs[4], xs[3])).toEqual(true)
  })

  it('correct non-match', () => {
    expect(f(xs[0], xs[3])).toEqual(false)
    expect(f(xs[0], xs[4])).toEqual(false)

    expect(f(xs[3], xs[0])).toEqual(false)
    expect(f(xs[3], xs[1])).toEqual(false)
    expect(f(xs[3], xs[2])).toEqual(false)

    expect(f(xs[4], xs[0])).toEqual(false)
    expect(f(xs[4], xs[1])).toEqual(false)
    expect(f(xs[4], xs[2])).toEqual(false)
  })
})

describe('matchNamesakeOnContainingCodeInOrder()', () => {
  const f = matchNamesakeOnContainingCodeInOrder
  const xs = [
    {
      code: 'WT',
      namesake: '*W*aldshu*t*',
      district: 'Waldshut',
    },
    {
      code: 'WTL',
      namesake: '*W*i*tt*lage',
      district: 'Wittlage',
    },
    {
      code: 'MB',
      namesake: '*M*ies*b*ach',
      district: 'Miesbach',
    },
    {
      code: 'MD',
      namesake: '*M*ag*d*eburg',
      district: 'Magdeburg',
      state: 'Sachsen-Anhalt',
    },
    {
      code: 'BM',
      namesake: '*B*erghei*m*',
      district: 'Rhein-Erft-Kreis',
      state: 'Nordrhein-Westfalen',
    },
  ]

  it('correct match', () => {
    // Wittlage containing WT, in that order
    expect(f(xs[0], xs[1])).toEqual(true)

    // Magdeburg containing MB, in that order
    expect(f(xs[2], xs[3])).toEqual(true)
  })

  it('correct non-match', () => {
    // Bergheim containing MB, but not in that order
    expect(f(xs[4], xs[2])).toEqual(false)
  })
})

describe('matchNamesakeOnContainingCodeNotInOrder()', () => {
  const f = matchNamesakeOnContainingCodeNotInOrder
  const xs = [
    {
      code: 'WT',
      namesake: '*W*aldshu*t*',
      district: 'Waldshut',
    },
    {
      code: 'WTL',
      namesake: '*W*i*tt*lage',
      district: 'Wittlage',
    },
    {
      code: 'WTM',
      namesake: '*W*i*t*t*m*und',
      district: 'Wittmund',
    },
    {
      code: 'WÜ',
      namesake: '*Wü*rzburg',
      district: 'Würzburg',
    },
    {
      code: 'WÜM',
      namesake: '*W*ald*m**ü*nchen',
      district: 'Waldmünchen',
    },
  ]

  it('correct match', () => {
    // Wittlage containing WT
    expect(f(xs[0], xs[1])).toEqual(true)

    // Wittmund containing WT
    expect(f(xs[0], xs[2])).toEqual(true)

    // Waldmünchen containing WÜ
    expect(f(xs[3], xs[4])).toEqual(true)
  })

  it('correct non-match', () => {
    // Würzburg not containing WT
    expect(f(xs[0], xs[3])).toEqual(false)

    // Waldmünchen not containing WT
    expect(f(xs[0], xs[4])).toEqual(false)

    // Wittmund not containing WÜ
    expect(f(xs[3], xs[2])).toEqual(false)
  })
})

describe('matchNamesakeOnNamesakeLevenshtein()', () => {
  const xs = [
    {
      code: 'WT',
      namesake: '*W*aldshu*t*',
      district: 'Waldshut',
    },
    {
      code: 'WTL',
      namesake: '*W*i*tt*lage',
      district: 'Wittlage',
    },
    {
      code: 'WTM',
      namesake: '*W*i*t*t*m*und',
      district: 'Wittmund',
    },
  ]

  it('correct match (n=4)', () => {
    const f = matchNamesakeOnNamesakeLevenshtein(4)

    // Wittlage and Wittmund are close
    expect(f(xs[1], xs[2])).toEqual(true)
  })

  it('correct non-match (n=4)', () => {
    const f = matchNamesakeOnNamesakeLevenshtein(4)

    // Waldshut and Wittlage are too far apart
    expect(f(xs[0], xs[1])).toEqual(false)

    // Waldshut and Wittmund are too far apart
    expect(f(xs[0], xs[2])).toEqual(false)
  })
})
