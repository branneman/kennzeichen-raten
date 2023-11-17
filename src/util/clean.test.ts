import { describe, it, expect } from 'vitest'
import {
  clean,
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

describe('removeDiacritics()', () => {
  it('replaces diacritics with base letters', () => {
    const xs: [string, string][] = [
      ['Oberallgäu', 'Oberallgaeu'],
      ['Görlitz', 'Goerlitz'],
      ['München', 'Muenchen'],
      ['Weißenfels', 'Weissenfels'],
    ]

    xs.forEach(([x, y]: [string, string]) => {
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
