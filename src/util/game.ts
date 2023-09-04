import { append, map, pipe, prop, slice, sort } from 'ramda'
import { AreaCode } from '../types/area-codes'
import { Game, Difficulty } from '../types/game'
import {
  Matcher,
  findMatches,
  matchNamesakeOnStartingWithCode,
  matchNamesakeOnContainingCodeInOrder,
  matchNamesakeOnContainingCodeNotInOrder,
  matchNamesakeOnNamesakeLevenshtein,
} from './closest'
import { shuffle } from './array'

import DATA from '../data/area-codes.json' assert { type: 'json' }

const MATCHERS: Matcher[] = [
  { f: matchNamesakeOnStartingWithCode, n: 10 },
  { f: matchNamesakeOnContainingCodeInOrder, n: 10 },
  { f: matchNamesakeOnContainingCodeNotInOrder, n: 5 },
  { f: matchNamesakeOnNamesakeLevenshtein(4), n: 10 },
  { f: matchNamesakeOnNamesakeLevenshtein(10), n: 2 },
]

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
  // generate 10 questions
  const questions = slice(0, 10, shuffle(DATA))

  const rawQuestion2gameQuestion = (question: AreaCode) => {
    const g = pipe(
      findMatches(MATCHERS, DATA),
      prop('matches'),
      sort(
        (a: AreaCode, z: AreaCode) =>
          (z.score as number) - (a.score as number),
      ),
      slice(0, 2),
      append(question),
      shuffle,
    )

    return { question, choices: g(question) as AreaCode[] }
  }

  return {
    startedAt: new Date(),
    difficulty,

    // { question, choices }[]
    questions: map(rawQuestion2gameQuestion, questions),

    // { question, answer, isCorrect }[]
    answers: [],
  }
}

export const getCurrentQuestion = (
  game: Game,
): { question: AreaCode; choices: AreaCode[] } => {
  return game.questions[game.answers.length]
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
