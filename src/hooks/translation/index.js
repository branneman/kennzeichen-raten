import { createContext, useContext, useState } from 'react'

export const createTranslationState = (translations) => {
  const [language, setLanguage] = useState(
    translations.defaultLanguage,
  )
  return {
    t: makeTranslateFunction(translations, language),
    language,
    setLanguage,
  }
}

const defaultContext = {
  defaultLanguage: 'en',
  en: { key1: 'value1' },
}
let TranslationContext
export const createTranslationContext = () => {
  if (TranslationContext !== undefined)
    return TranslationContext

  TranslationContext = createContext(
    createTranslationState(defaultContext),
  )
  return TranslationContext
}

export function useTranslation() {
  return useContext(TranslationContext)
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
