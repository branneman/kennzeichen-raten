import { useContext } from 'react'
import { TranslationContext } from '../../context/translation'

export function useTranslation() {
  return useContext(TranslationContext)
}

export const makeTranslationValue = (
  translations,
  language,
  setLanguage,
) => {
  const t = (key) =>
    getObjectPropertyByPathSpecifier(
      key,
      translations[language],
    )
  return { t, language, setLanguage }
}

export function getObjectPropertyByPathSpecifier(key, obj) {
  const parts = key.split('.')
  const iterator = (acc, curr) => {
    if (typeof acc === 'string') return acc
    return acc && acc[curr]
  }
  return parts.reduce(iterator, obj)
}
