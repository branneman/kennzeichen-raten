import { describe, it, expect } from 'vitest'
import { splitByBoldStar } from './string'

describe('splitByBoldStar()', () => {
  it('returns array of 1 without matches', () => {
    expect(splitByBoldStar('abc')).toEqual([
      { str: 'abc', tag: '' },
    ])
  })

  it('returns 1 match', () => {
    expect(splitByBoldStar('a*b*c')).toEqual([
      { str: 'a', tag: '' },
      { str: 'b', tag: 'mark' },
      { str: 'c', tag: '' },
    ])
  })

  it('returns multiple matches', () => {
    expect(splitByBoldStar('*A*schaffen*b*urg')).toEqual([
      { str: 'A', tag: 'mark' },
      { str: 'schaffen', tag: '' },
      { str: 'b', tag: 'mark' },
      { str: 'urg', tag: '' },
    ])

    expect(splitByBoldStar('Bad *B*er*l*e*b*urg')).toEqual([
      { str: 'Bad ', tag: '' },
      { str: 'B', tag: 'mark' },
      { str: 'er', tag: '' },
      { str: 'l', tag: 'mark' },
      { str: 'e', tag: '' },
      { str: 'b', tag: 'mark' },
      { str: 'urg', tag: '' },
    ])
  })

  it('combines characters', () => {
    expect(splitByBoldStar('*W**ü*rzburg')).toEqual([
      { str: 'Wü', tag: 'mark' },
      { str: 'rzburg', tag: '' },
    ])
  })
})
