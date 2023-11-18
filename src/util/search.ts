import { toLower } from 'ramda'
import {
  clean,
  replaceDiacritics,
  removeDiacritics,
} from './clean'
import { AreaCode } from '../types/area-codes'

export function isMatch(query: string) {
  const q = toLower(query)

  return (ac: AreaCode): boolean => {
    return (
      clean(ac.namesake).includes(q) ||
      clean(ac.district).includes(q) ||
      replaceDiacritics(clean(ac.namesake)).includes(q) ||
      replaceDiacritics(clean(ac.district)).includes(q) ||
      removeDiacritics(clean(ac.namesake)).includes(q) ||
      removeDiacritics(clean(ac.district)).includes(q)
    )
  }
}
