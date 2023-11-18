import { describe, it, expect } from 'vitest'
import { AreaCode } from '../types/area-codes'
import { isMatch } from './search'

describe('isMatch()', () => {
  it('matches on a literal code', () => {
    const q = 'abi'
    const ac: AreaCode = {
      code: 'ABI',
      namesake: '*A*nhalt-*B**i*tterfeld',
      district: 'Anhalt-Bitterfeld',
      state: 'Sachsen-Anhalt',
    }

    const r = isMatch(q)(ac)

    expect(r).toEqual(true)
  })

  it('matches on a literal namesake', () => {
    const q = 'Augsburg'
    const ac: AreaCode = {
      code: 'A',
      namesake: 'Augsburg',
      district: 'Augsburg',
    }

    const r = isMatch(q)(ac)

    expect(r).toEqual(true)
  })

  it('matches on partial namesake, lowercased', () => {
    const q = 'mün'
    const ac: AreaCode = {
      code: 'A',
      namesake: 'München',
      district: 'München',
    }

    const r = isMatch(q)(ac)

    expect(r).toEqual(true)
  })

  it('matches on a literal district', () => {
    const q = 'Greiz'
    const ac: AreaCode = {
      code: 'ZR',
      namesake: 'Zeulenroda',
      district: 'Greiz',
      state: 'Thüringen',
    }

    const r = isMatch(q)(ac)

    expect(r).toEqual(true)
  })

  it('matches diacritic-insensitive (ö -> oe)', () => {
    const q = 'loebau'
    const ac: AreaCode = {
      code: 'ZI',
      namesake: 'Löbau-Zittau',
      district: 'Löbau-Zittau',
      state: 'Sachsen',
    }

    const r = isMatch(q)(ac)

    expect(r).toEqual(true)
  })

  it('matches diacritic-insensitive (ü -> u)', () => {
    const q = 'munchen'
    const ac: AreaCode = {
      code: 'M',
      namesake: 'München',
      district: 'München',
      state: 'Bayern',
    }

    const r = isMatch(q)(ac)

    expect(r).toEqual(true)
  })

  it('matches cleaned namesake (without *)', () => {
    const q = 'zell'
    const ac: AreaCode = {
      code: 'ZEL',
      namesake: '*Zel*l',
      district: 'Cochem',
    }

    const r = isMatch(q)(ac)

    expect(r).toEqual(true)
  })
})
