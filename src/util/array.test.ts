import { describe, it, expect } from 'vitest'
import { permutations } from './array'

describe('permutations()', () => {
  it('returns complete list for 2 elements, list length 2', () => {
    const list = [1, 2]

    const result = permutations(2, list)

    expect(result).toEqual([
      [1, 2],
      [2, 1],
    ])
  })

  it('returns complete list for 2 elements, list length 4', () => {
    const list = [1, 2, 3, 4]

    const result = permutations(2, list)

    expect(result).toEqual([
      [1, 2],
      [1, 3],
      [1, 4],
      [2, 1],
      [2, 3],
      [2, 4],
      [3, 1],
      [3, 2],
      [3, 4],
      [4, 1],
      [4, 2],
      [4, 3],
    ])
  })

  it('returns complete list for 3 elements, list length 4', () => {
    const list = [1, 2, 3, 4]

    const result = permutations(3, list)

    expect(result).toEqual([
      [1, 2, 3],
      [1, 2, 4],
      [1, 3, 2],
      [1, 3, 4],
      [1, 4, 2],
      [1, 4, 3],
      [2, 1, 3],
      [2, 1, 4],
      [2, 3, 1],
      [2, 3, 4],
      [2, 4, 1],
      [2, 4, 3],
      [3, 1, 2],
      [3, 1, 4],
      [3, 2, 1],
      [3, 2, 4],
      [3, 4, 1],
      [3, 4, 2],
      [4, 1, 2],
      [4, 1, 3],
      [4, 2, 1],
      [4, 2, 3],
      [4, 3, 1],
      [4, 3, 2],
    ])
  })
})
