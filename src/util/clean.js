import { map, split, join, toLower } from 'ramda'

// Source: https://en.m.wikipedia.org/wiki/German_orthography
const GERMAN_DIACRITICS_REPLACE = new Map([
  ['Ä', 'AE'],
  ['ä', 'ae'],
  ['Ö', 'OE'],
  ['ö', 'oe'],
  ['Ü', 'UE'],
  ['ü', 'ue'],
  ['ẞ', 'SS'],
  ['ß', 'ss'],
])
const GERMAN_DIACRITICS_REMOVE = new Map([
  ['Ä', 'A'],
  ['ä', 'a'],
  ['Ö', 'O'],
  ['ö', 'o'],
  ['Ü', 'U'],
  ['ü', 'u'],
])

export const clean = (s) => toLower(s.replace(/\*/g, ''))

// Remove namesake highlighting
//  (e.g. because it would be a hint otherwise)
export const formatNamesake = (s) => s.replace(/\*/g, '')

export const replaceDiacritics = (s) => {
  const f = (char) =>
    GERMAN_DIACRITICS_REPLACE.has(char)
      ? GERMAN_DIACRITICS_REPLACE.get(char)
      : char

  const str2array = split('')
  const array2str = join('')
  return array2str(map(f, str2array(s)))
}

export const removeDiacritics = (s) => {
  const f = (char) =>
    GERMAN_DIACRITICS_REMOVE.has(char)
      ? GERMAN_DIACRITICS_REMOVE.get(char)
      : char

  const str2array = split('')
  const array2str = join('')
  return array2str(map(f, str2array(s)))
}

export const namesakeEqualsDistrict = (
  namesake,
  district,
) => {
  const s1 = replaceDiacritics(clean(namesake))
  const s2 = replaceDiacritics(clean(district))
  return s1 === s2
}
