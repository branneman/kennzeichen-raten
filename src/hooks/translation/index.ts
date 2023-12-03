import React, {
  createContext,
  useContext,
  useState,
} from 'react'
import {
  Translations,
  NestedTranslation,
  TranslationFunctions,
} from './index.types'

export const createTranslationState = (
  translations: Translations,
) => {
  const [language, setLanguage] = useState<string>(
    translations.defaultLanguage,
  )
  return {
    t: makeTranslateFunction(translations, language),
    language,
    setLanguage,
  }
}

const defaultContext: Translations = {
  defaultLanguage: 'en',
  en: { key1: 'value1' },
}
let TranslationContext: React.Context<TranslationFunctions>
export const createTranslationContext =
  (): React.Context<TranslationFunctions> => {
    if (TranslationContext !== undefined)
      return TranslationContext

    TranslationContext = createContext(
      createTranslationState(defaultContext),
    )
    return TranslationContext
  }

export function useTranslation(): TranslationFunctions {
  return useContext(TranslationContext)
}

export function makeTranslateFunction(
  translations: Translations,
  language: string,
) {
  return (key: string): string => {
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

export function getObjectPropertyByPathSpecifier(
  key: string,
  obj: NestedTranslation | string,
): string | undefined {
  const parts = key.split('.')
  const iterator = (
    acc: NestedTranslation | string,
    curr: string,
  ) => {
    if (typeof acc === 'string') return acc
    return acc && acc[curr]
  }
  return parts.reduce(iterator, obj) as string | undefined
}
