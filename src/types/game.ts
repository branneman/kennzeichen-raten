import { AreaCode } from './area-codes'

export type Game = {
  startedAt: Date
  difficulty: Difficulty
  questions: {
    question: AreaCode
    choices: AreaCode[]
  }[]
  answers: {
    question: AreaCode
    answer: AreaCode
    isCorrect: boolean
  }[]
}

export enum Difficulty {
  easy = 1,
  medium = 2,
  hard = 3,
}
