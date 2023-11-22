import {
  append,
  clone,
  filter,
  map,
  pipe,
  prop,
  slice,
  sort,
} from 'ramda'
import { AreaCode } from '../types/area-codes'
import { Game, Difficulty } from '../types/game'
import { randomLicensePlate } from './license-plate'
import {
  Matcher,
  findMatches,
  matchNamesakeOnHighPopulation,
  matchNamesakeOnStartingWithCode,
  matchNamesakeOnFirstLetterOfCode,
  matchNamesakeOnContainingCodeInOrder,
  matchNamesakeOnContainingCodeNotInOrder,
  matchNamesakeOnNamesakeLevenshtein,
} from './closest'
import { shuffle } from './array'

import DATA from '../data/area-codes.json' assert { type: 'json' }

const MATCHERS: { [key: string]: Matcher[] } = {
  '1': [
    { f: matchNamesakeOnNamesakeLevenshtein(10), n: 15 },
    { f: matchNamesakeOnHighPopulation(500_000), n: 10 },
    { f: matchNamesakeOnStartingWithCode, n: 10 },
    { f: matchNamesakeOnContainingCodeInOrder, n: 10 },
  ],
  '2': [
    { f: matchNamesakeOnStartingWithCode, n: 15 },
    { f: matchNamesakeOnNamesakeLevenshtein(5), n: 10 },
    { f: matchNamesakeOnContainingCodeInOrder, n: 10 },
    { f: matchNamesakeOnHighPopulation(500_000), n: 5 },
    { f: matchNamesakeOnFirstLetterOfCode, n: 5 },
    { f: matchNamesakeOnContainingCodeNotInOrder, n: 5 },
  ],
  '3': [
    { f: matchNamesakeOnStartingWithCode, n: 15 },
    { f: matchNamesakeOnFirstLetterOfCode, n: 15 },
    { f: matchNamesakeOnContainingCodeInOrder, n: 15 },
    { f: matchNamesakeOnNamesakeLevenshtein(4), n: 10 },
    { f: matchNamesakeOnNamesakeLevenshtein(10), n: 2 },
    { f: matchNamesakeOnContainingCodeNotInOrder, n: 2 },
  ],
}

export const hasStarted = (game: Game | null) =>
  game !== null

export const isDone = (game: Game | null) => {
  if (game === null) return false
  return game.questions.length === game.answers.length
}

export const difficultyStr2Int = (str: string) => {
  const i = {
    easy: 1,
    medium: 2,
    hard: 3,
  }[str]
  if (!i) throw new Error('Unknown difficulty: ' + str)
  return i
}

export const generateNewGameState = (
  difficulty: Difficulty,
): Game => {
  const amount: number = {
    '1': 10,
    '2': 20,
    '3': 20,
  }[difficulty]
  const data = getDataByDifficulty(difficulty, clone(DATA))
  const questions = slice(0, amount, shuffle(data))

  return {
    startedAt: new Date(),
    difficulty,

    // { question, choices }[]
    questions: map(
      rawQuestion2gameQuestion(difficulty),
      questions,
    ),

    // { question, answer, isCorrect }[]
    answers: [],
  }
}

const rawQuestion2gameQuestion =
  (difficulty: Difficulty) => (question: AreaCode) => {
    const getChoices = pipe(
      findMatches(MATCHERS[String(difficulty)], DATA),
      prop('matches') as () => AreaCode[],
      sort(
        (a: AreaCode, z: AreaCode) =>
          (z.score as number) - (a.score as number),
      ),
      slice(0, 2) as (a: AreaCode[]) => AreaCode[],
      append(question),
      shuffle,
    )

    const plate = randomLicensePlate(question.code).code

    return {
      question: { ...question, plate },
      choices: getChoices(question) as AreaCode[],
    }
  }

export const getDataByDifficulty = (
  difficulty: Difficulty,
  data: AreaCode[],
): AreaCode[] => {
  if (difficulty === 1) {
    return filter(
      (ac: AreaCode) => ac.code.length === 1,
      data,
    )
  }
  if (difficulty === 2) {
    return filter(
      (ac: AreaCode) => ac.code.length === 2,
      data,
    )
  }
  if (difficulty === 3) {
    return filter(
      (ac: AreaCode) => ac.code.length !== 1,
      data,
    )
  }
  return data
}

export const getCurrentQuestion = (
  game: Game,
): { question: AreaCode; choices: AreaCode[] } => {
  return game.questions[game.answers.length]
}

export const getLastAnswer = (
  game: Game,
): {
  question: AreaCode
  choices: AreaCode[]
  answer: AreaCode
  isCorrect: boolean
} => {
  const { question, answer, isCorrect } =
    game.answers[game.answers.length - 1]

  const { choices } = game.questions.find(
    (ac) => ac.question.code === question.code,
  ) as { question: AreaCode; choices: AreaCode[] }

  return {
    question,
    choices,
    answer,
    isCorrect,
  }
}

export const answerQuestion = (
  game: Game,
  question: AreaCode,
  answer: AreaCode,
): Game => {
  const isCorrect = question.code === answer.code

  const answers = game.answers.slice() // clone array
  answers.push({ question, answer, isCorrect })

  return { ...game, answers }
}

export const getResults = (
  game: Game,
): {
  percentage: number
  correct: number
  incorrect: number
} => {
  const count = (
    f: (a: { isCorrect: boolean }) => boolean,
  ) => game.answers.filter(f).length

  const correct = count((a) => a.isCorrect)
  const incorrect = count((a) => !a.isCorrect)
  const percentage = (correct / game.answers.length) * 100

  return { percentage, correct, incorrect }
}
