import { map, split, join, toLower } from 'ramda'

// Source: https://en.m.wikipedia.org/wiki/German_orthography
const GERMAN_DIACRITICS = new Map([
  ['Ä', 'AE'],
  ['ä', 'ae'],
  ['Ö', 'OE'],
  ['ö', 'oe'],
  ['Ü', 'UE'],
  ['ü', 'ue'],
  ['ẞ', 'SS'],
  ['ß', 'ss'],
])

export const clean = (s: string) =>
  toLower(s.replace(/\*/g, ''))

// Remove namesake highlighting
//  (e.g. because it would be a hint otherwise)
export const formatNamesake = (s: string) =>
  s.replace(/\*/g, '')

export const removeDiacritics = (s: string) => {
  const f = (char: string) =>
    GERMAN_DIACRITICS.has(char)
      ? GERMAN_DIACRITICS.get(char)
      : char

  const str2array = split('')
  const array2str = join('')
  return array2str(map(f, str2array(s)))
}

export const namesakeEqualsDistrict = (
  namesake: string,
  district: string,
) => {
  const s1 = removeDiacritics(clean(namesake))
  const s2 = removeDiacritics(clean(district))
  return s1 === s2
}