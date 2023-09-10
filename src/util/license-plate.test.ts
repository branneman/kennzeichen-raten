import { describe, it, expect } from 'vitest'
import { randomString } from './random'
import { randomLicensePlate } from './license-plate'

describe('randomLicensePlate()', () => {
  const randomPrefix = () =>
    randomString(
      1 + Math.ceil(Math.random() * 2),
      'ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÜ',
    )
  const run = (n: number, f: () => void) => {
    for (let i = 0; i < n; i++) f()
  }

  it('adheres to the format', () => {
    const re = /[A-ZÄÖÜ]{1,3} [A-Z]{1,2} [0-9]{2,5}/

    run(1e4, () => {
      const prefix = randomPrefix().toUpperCase()
      const code = randomLicensePlate(prefix)
      const plate = code.prefix + ' ' + code.code

      expect(re.test(plate)).toEqual(true)
    })
  })

  it("doesn't generate strings longer than 8", () => {
    run(1e4, () => {
      const prefix = randomPrefix()
      const code = randomLicensePlate(prefix)
      const plate = code.prefix + code.code

      expect(plate.length).toBeLessThanOrEqual(8)
    })
  })
})
