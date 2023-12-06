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
  return {
    t: makeTranslateFunction(translations, language),
    language,
    setLanguage,
  }
}

export function makeTranslateFunction(
  translations,
  language,
) {
  return (key) => {
    const result = getObjectPropertyByPathSpecifier(
      key,
      translations[language],
    )
    if (result === undefined) {
      throw new Error(
        `Missing translation key "${key}" for language "${language}"`,
      )
    }
    return result
  }
}

export function getObjectPropertyByPathSpecifier(key, obj) {
  const parts = key.split('.')
  const iterator = (acc, curr) => {
    if (typeof acc === 'string') return acc
    return acc && acc[curr]
  }
  return parts.reduce(iterator, obj)
}
