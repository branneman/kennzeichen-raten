import { describe, it, expect } from 'vitest'
import { clean, removeDiacritics } from './clean'

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
