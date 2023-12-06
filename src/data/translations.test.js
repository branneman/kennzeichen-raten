import { describe, it, expect } from 'vitest'
import { deepStrictEqual } from 'assert'
import { permutations } from '../util/array'
import { isPOJO, walkObjectLeafNodes } from '../util/object'

import translations from './translations.json'
const languages = Object.keys(translations).filter(
  (key) => key !== 'defaultLanguage',
)

describe('data/translations.json', () => {
  it('all property values are strings', () => {
    languages.forEach((language) => {
      walkObjectLeafNodes(
        translations[language],
        (_key, value) => {
          expect(typeof value).toEqual('string')
        },
      )
    })
  })

  it('has equal properties for all languages', () => {
    // Using assert.deepStrictEqual because it supports a message,
    //  printing a path on failure is critical to find the problem.

    const walkTwo = (obj1, obj2, debug) => {
      const debugPrefix = `walkTwo(${debug.obj1}, ${debug.obj2}) at path '${debug.path}': `

      deepStrictEqual(
        isPOJO(obj1),
        true,
        `${debugPrefix}'${debug.obj1}' is not POJO`,
      )
      deepStrictEqual(
        isPOJO(obj2),
        true,
        `${debugPrefix}'${debug.obj2}' is not POJO`,
      )

      deepStrictEqual(
        Object.keys(obj1).length,
        Object.keys(obj2).length,
        `${debugPrefix}Not the same amount of properties in '${debug.obj1}' and '${debug.obj2}'`,
      )

      Object.keys(obj1).forEach((key) => {
        deepStrictEqual(
          key in obj2,
          true,
          `${debugPrefix}'${key}' not found in '${debug.obj2}'`,
        )

        if (!isPOJO(obj1[key])) return

        deepStrictEqual(
          isPOJO(obj2[key]),
          true,
          `${debugPrefix}'${key}' is not POJO`,
        )
        deepStrictEqual(
          Object.keys(obj1[key]).length !== 0,
          true,
          `${debugPrefix}'${key}' is empty POJO`,
        )
        deepStrictEqual(
          Object.keys(obj2[key]).length !== 0,
          true,
          `${debugPrefix}'${key}' is empty POJO`,
        )

        const newDebug = {
          ...debug,
          path: debug.path + `.${key}`,
        }
        walkTwo(obj1[key], obj2[key], newDebug)
      })
    }

    permutations(2, languages).forEach(
      ([language1, language2]) => {
        walkTwo(
          translations[language1],
          translations[language2],
          {
            obj1: language1,
            obj2: language2,
            path: language1,
          },
        )
      },
    )
  })
})
