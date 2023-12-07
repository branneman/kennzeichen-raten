import { exit } from 'node:process'
import { readFileSync } from 'fs'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import { parse } from '@babel/parser'
import traverse from '@babel/traverse'

const __dirname = path.dirname(
  fileURLToPath(import.meta.url),
)
const translations = JSON.parse(
  readFileSync(`${__dirname}/../../data/translations.json`),
)

const searchDirectory = async (dir) => {
  const result = []
  const files = await fs.readdir(dir)
  for (const file of files) {
    const filePath = path.join(dir, file)
    const stat = await fs.stat(filePath)
    if (stat.isDirectory()) {
      const recursiveResult =
        await searchDirectory(filePath)
      recursiveResult.forEach((r) => result.push(r))
    } else if (
      filePath.endsWith('.jsx') ||
      filePath.endsWith('.js')
    ) {
      result.push(filePath)
    }
  }
  return result
}

const getUsedTranslationKeys = async (filePath) => {
  const content = await fs.readFile(filePath, 'utf-8')
  const ast = parse(content, {
    sourceType: 'module',
    plugins: ['jsx'],
  })

  let fileIsImportingTranslationHook = false
  const usedTranslationKeys = []

  traverse.default(ast, {
    ImportDeclaration({ node }) {
      const importPath = node.source.value
      if (!importPath.endsWith('./hooks/translation')) {
        return
      }
      node.specifiers.forEach((specifier) => {
        if (
          specifier.imported &&
          specifier.imported.name === 'useTranslation' &&
          specifier.local.name === 'useTranslation'
        ) {
          fileIsImportingTranslationHook = true
        }
      })
    },

    CallExpression({ node }) {
      if (
        node.callee.name === 't' &&
        node.arguments.length === 1 &&
        node.arguments[0].type === 'StringLiteral' &&
        fileIsImportingTranslationHook === true
      ) {
        usedTranslationKeys.push(node.arguments[0].value)
      }
    },
  })

  return usedTranslationKeys
}

// Todo: Import this function from src/hooks/translation/index.js
const getObjectPropertyByPathSpecifier = (key, obj) => {
  const parts = key.split('.')
  const iterator = (acc, curr) => {
    if (typeof acc === 'string') return acc
    return acc && acc[curr]
  }
  return parts.reduce(iterator, obj)
}

const getAllUsedTranslationKeys = async () => {
  const allJsJsxFiles = await searchDirectory(
    path.join(__dirname, '../../'),
  )
  const eligibleFiles = allJsJsxFiles.filter(
    (file) => file !== fileURLToPath(import.meta.url),
  )
  return Promise.all(
    eligibleFiles.flatMap(async (filePath) => {
      return await getUsedTranslationKeys(filePath)
    }),
  )
}

const getMissingTranslationKeys = async () => {
  return (await getAllUsedTranslationKeys())
    .filter((xs) => xs.length > 0)
    .flatMap((x) => x)
    .filter((key) => {
      const val = getObjectPropertyByPathSpecifier(
        key,
        translations[translations.defaultLanguage],
      )
      return val === undefined
    })
}

const errors = await getMissingTranslationKeys()
if (errors.length > 0) {
  errors.forEach((key) => {
    console.error(`Translation key not found: ${key}`)
  })
  exit(1)
}
exit(0)
