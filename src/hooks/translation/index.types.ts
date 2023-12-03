import React from 'react'

export type NestedTranslation = {
  [key: string]: string | NestedTranslation
}

export type Translations = {
  defaultLanguage: string
  [languageCode: string]:
    | string
    | {
        [key: string]: string | NestedTranslation
      }
}

export type TranslationFunctions = {
  t: (key: string) => string
  language: string
  setLanguage: React.Dispatch<React.SetStateAction<string>>
}
