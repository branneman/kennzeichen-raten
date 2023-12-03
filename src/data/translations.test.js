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

    const walkTwo = (obj1, obj2, path) => {
      deepStrictEqual(
        true,
        isPOJO(obj1),
        `At path '${path}': obj1 is not POJO`,
      )
      deepStrictEqual(
        true,
        isPOJO(obj2),
        `At path '${path}': obj2 is not POJO`,
      )

      deepStrictEqual(
        Object.keys(obj1).length,
        Object.keys(obj2).length,
        `At path '${path}': keys of obj1 and obj2 are not of the same length`,
      )

      Object.keys(obj1).forEach((key) => {
        deepStrictEqual(
          true,
          key in obj2,
          `At path '${path}': '${key}' not found in obj2`,
        )

        if (!isPOJO(obj1[key])) return

        deepStrictEqual(
          true,
          isPOJO(obj2[key]),
          `At path '${path}': obj2['${key}'] is not POJO`,
        )

        walkTwo(obj1[key], obj2[key], path + `.${key}`)
      })
    }

    permutations(2, languages).forEach(
      ([language1, language2]) => {
        walkTwo(
          translations[language1],
          translations[language2],
          `[${language1},${language2}]`,
        )
      },
    )
  })
})
