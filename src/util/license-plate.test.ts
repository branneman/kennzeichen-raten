import { describe, it, expect } from 'vitest'
import { randomString, randomNumber } from './random'
import { randomLicensePlate } from './license-plate'

describe('randomLicensePlate()', () => {
  const run = (n: number, f: () => void) => {
    for (let i = 0; i < n; i++) f()
  }

  it('code length (incl. space) between 4 and 7 when prefix is 1-2 letters', () => {
    // short code: `A 12`
    // long code: `AB 1234`
    const RE = /[A-Z]{1,2} [0-9]{2,4}/

    run(1e5, () => {
      const { code } = randomLicensePlate('A')
      expect(RE.test(code)).toEqual(true)
    })

    run(1e5, () => {
      const { code } = randomLicensePlate('AB')
      expect(RE.test(code)).toEqual(true)
    })
  })

  it('code length (incl. space) between 4 and 6 when prefix is 3 letters', () => {
    run(1e5, () => {
      const { code } = randomLicensePlate('ABC')
      expect(code.length >= 4).toEqual(true)
      expect(code.length <= 6).toEqual(true)
    })
  })

  it('digits can not lead with 0', () => {
    run(1e5, () => {
      const prefixLength = randomNumber(1, 3)
      const prefix = randomString(prefixLength, 'ABCDEF')

      const { code } = randomLicensePlate(prefix)
      expect(code[0]).not.toEqual('0')
    })
  })
})
