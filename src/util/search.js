import { toLower } from 'ramda'
import {
  clean,
  replaceDiacritics,
  removeDiacritics,
} from './clean'

export function isMatch(query) {
  const q = toLower(query)

  return (ac) => {
    return (
      clean(ac.code) === q ||
      clean(ac.namesake).includes(q) ||
      clean(ac.district).includes(q) ||
      replaceDiacritics(clean(ac.namesake)).includes(q) ||
      replaceDiacritics(clean(ac.district)).includes(q) ||
      removeDiacritics(clean(ac.namesake)).includes(q) ||
      removeDiacritics(clean(ac.district)).includes(q)
    )
  }
}
