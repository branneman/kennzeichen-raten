import { toLower } from 'ramda'
import { clean } from './clean'
import { AreaCode } from '../types/area-codes'

export function isMatch(query: string) {
  const q = toLower(query)

  return (ac: AreaCode): boolean => {
    return (
      clean(ac.namesake).includes(q) ||
      clean(ac.district).includes(q)
    )
  }
}
