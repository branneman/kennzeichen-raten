import { describe, it, expect } from 'vitest'
import { randomNumber } from './random'

describe('randomNumber()', () => {
  const run = (n, f) => {
    for (let i = 0; i < n; i++) f()
  }

  it('adheres to the min and max, both inclusively', () => {
    run(1e5, () => {
      const n = randomNumber(10, 999)

      expect(n >= 10).toEqual(true)
      expect(n <= 999).toEqual(true)
    })
  })
})
