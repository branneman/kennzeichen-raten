import { describe, it, expect } from 'vitest'
import { walkObjectLeafNodes } from '../util/object'

describe('walkObjectLeafNodes()', () => {
  it('calls fn() for all leaf nodes of the object, recursively', () => {
    const obj = {
      abc: {
        ghi: {
          hij: {
            z: 1,
            y: 2,
            x: 42,
          },
        },
        zz: 3,
      },
      def: {
        yy: 4,
      },
    }

    const result = []
    const fn = (key, value) => result.push([key, value])
    walkObjectLeafNodes(obj, fn)

    expect(result).toEqual([
      ['z', 1],
      ['y', 2],
      ['x', 42],
      ['zz', 3],
      ['yy', 4],
    ])
  })
})
