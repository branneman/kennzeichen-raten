import { describe, it, expect } from 'vitest'
import { splitByBoldStar } from './string'

describe('splitByBoldStar()', () => {
  it('returns array of 1 without matches', () => {
    expect(splitByBoldStar('abc')).toEqual([
      { str: 'abc', tag: 'span' },
    ])
  })

  it('returns 1 match', () => {
    expect(splitByBoldStar('a*b*c')).toEqual([
      { str: 'a', tag: 'span' },
      { str: 'b', tag: 'strong' },
      { str: 'c', tag: 'span' },
    ])
  })

  it('returns multiple matches', () => {
    expect(splitByBoldStar('*A*schaffen*b*urg')).toEqual([
      { str: 'A', tag: 'strong' },
      { str: 'schaffen', tag: 'span' },
      { str: 'b', tag: 'strong' },
      { str: 'urg', tag: 'span' },
    ])

    expect(splitByBoldStar('Bad *B*er*l*e*b*urg')).toEqual([
      { str: 'Bad ', tag: 'span' },
      { str: 'B', tag: 'strong' },
      { str: 'er', tag: 'span' },
      { str: 'l', tag: 'strong' },
      { str: 'e', tag: 'span' },
      { str: 'b', tag: 'strong' },
      { str: 'urg', tag: 'span' },
    ])
  })

  it('combines characters', () => {
    expect(splitByBoldStar('*W**ü*rzburg')).toEqual([
      { str: 'Wü', tag: 'strong' },
      { str: 'rzburg', tag: 'span' },
    ])
  })
})
