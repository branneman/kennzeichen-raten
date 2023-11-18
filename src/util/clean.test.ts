import { describe, it, expect } from 'vitest'
import {
  clean,
  replaceDiacritics,
  removeDiacritics,
  namesakeEqualsDistrict,
} from './clean'

describe('clean()', () => {
  it('removes all ocurrences of *', () => {
    expect(clean('*A*ugsburg')).toEqual('augsburg')
  })

  it('lowercases', () => {
    expect(clean('Augsburg')).toEqual('augsburg')
  })
})

describe('replaceDiacritics()', () => {
  it('replaces diacritics with base letters', () => {
    const xs = [
      ['Oberallgäu', 'Oberallgaeu'],
      ['Görlitz', 'Goerlitz'],
      ['München', 'Muenchen'],
      ['Weißenfels', 'Weissenfels'],
    ]

    xs.forEach(([x, y]) => {
      expect(replaceDiacritics(x)).toEqual(y)
    })
  })
})

describe('removeDiacritics()', () => {
  it('replaces diacritics with base letters', () => {
    const xs = [
      ['Oberallgäu', 'Oberallgau'],
      ['Görlitz', 'Gorlitz'],
      ['München', 'Munchen'],
      ['Weißenfels', 'Weißenfels'],
    ]

    xs.forEach(([x, y]) => {
      expect(removeDiacritics(x)).toEqual(y)
    })
  })
})

describe('namesakeEqualsDistrict()', () => {
  it('detects equal strings', () => {
    const r = namesakeEqualsDistrict('Augsburg', 'Augsburg')
    expect(r).toEqual(true)
  })

  it('detects equal strings, after cleaning', () => {
    const r = namesakeEqualsDistrict(
      '*A*ugsburg',
      'Augsburg',
    )
    expect(r).toEqual(true)
  })
})
