import { describe, it, expect } from 'vitest'
import { randomString, randomNumber } from './random'
import {
  randomLicensePlate,
  yearToSealColor,
} from './license-plate'

describe('randomLicensePlate()', () => {
  const run = (n, f) => {
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

describe('yearToSealColor()', () => {
  it('returns correct color key for braun', () => {
    const braun = [1992, 1998, 2010, 2016, 2022, 2028]
    const braunF = (y) => yearToSealColor(y) === 'braun'
    expect(braun.every(braunF)).toEqual(true)
  })

  it('returns correct color key for rosa', () => {
    const rosa = [1993, 1999, 2005, 2011, 2017, 2023, 2029]
    const rosaF = (y) => yearToSealColor(y) === 'rosa'
    expect(rosa.every(rosaF)).toEqual(true)
  })

  it('returns correct color key for grün', () => {
    const grün = [1994, 2000, 2006, 2012, 2018, 2024, 2030]
    const grünF = (y) => yearToSealColor(y) === 'grün'
    expect(grün.every(grünF)).toEqual(true)
  })

  it('returns correct color key for orange', () => {
    const orange = [
      1995, 2001, 2007, 2013, 2019, 2025, 2031,
    ]
    const orangeF = (y) => yearToSealColor(y) === 'orange'
    expect(orange.every(orangeF)).toEqual(true)
  })

  it('returns correct color key for blau', () => {
    const blau = [1996, 2002, 2008, 2014, 2020, 2026, 2032]
    const blauF = (y) => yearToSealColor(y) === 'blau'
    expect(blau.every(blauF)).toEqual(true)
  })

  it('returns correct color key for gelb', () => {
    const gelb = [1997, 2003, 2009, 2015, 2021, 2027, 2033]
    const gelbF = (y) => yearToSealColor(y) === 'gelb'
    expect(gelb.every(gelbF)).toEqual(true)
  })
})
