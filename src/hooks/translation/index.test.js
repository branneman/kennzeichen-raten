import { describe, it, expect } from 'vitest'
import { getObjectPropertyByPathSpecifier } from './index'

describe('getObjectPropertyByPathSpecifier()', () => {
  it('can access a level 1 property', () => {
    const obj = { abc: 'def' }
    const key = 'abc'

    const res = getObjectPropertyByPathSpecifier(key, obj)

    expect(res).toEqual('def')
  })

  it('can access a level 2 property', () => {
    const obj = { abc: { def: 'ghi' } }
    const key = 'abc.def'

    const res = getObjectPropertyByPathSpecifier(key, obj)

    expect(res).toEqual('ghi')
  })

  it('can access a level 7 property', () => {
    const obj = {
      a: { b: { c: { d: { e: { f: { g: 'leet' } } } } } },
    }
    const key = 'a.b.c.d.e.f.g'

    const res = getObjectPropertyByPathSpecifier(key, obj)

    expect(res).toEqual('leet')
  })

  it('returns undefined when key does not exist', () => {
    const obj = { abc: { def: 'ghi' } }
    const key = 'uvw.xyz'

    const res = getObjectPropertyByPathSpecifier(key, obj)

    expect(res).toEqual(undefined)
    expect(typeof res).toEqual('undefined')
  })
})
