import { randomBytes } from 'crypto'
import { describe, it, expect } from 'vitest'
import { clone } from 'ramda'
import {
  hasStarted,
  isDone,
  difficultyStr2Int,
  generateNewGameState,
  getDataByDifficulty,
  getCurrentQuestion,
  getLastAnswer,
  answerQuestion,
  getResults,
} from './game'
import { AreaCode } from '../types/area-codes'
import { Game } from '../types/game'

import DATA from '../data/area-codes.json' assert { type: 'json' }

const randomStr = (len: number) =>
  randomBytes(Math.floor(len / 2)).toString('hex')
const mockAreaCode = () => ({
  code: randomStr(3).toUpperCase(),
  namesake: randomStr(8),
  district: randomStr(8),
})

describe('matchers', () => {
  it.skip('easy: should generate 2 new answers per question', () => {})
  it.skip('medium: should generate 2 new answers per question', () => {})
  it.skip('hard: should generate 2 new answers per question', () => {})
})

describe('hasStarted()', () => {
  it('returns true with valid date', () => {
    const game: Game = {
      startedAt: new Date(),
      difficulty: 1,
      questions: [],
      answers: [],
    }

    expect(hasStarted(game)).toEqual(true)
  })

  it('returns false with valid date', () => {
    const game = null
    expect(hasStarted(game)).toEqual(false)
  })
})

describe('isDone()', () => {
  it('returns true when all questions have answers', () => {
    const ac1 = mockAreaCode()
    const ac2 = mockAreaCode()

    const game: Game = {
      startedAt: new Date(),
      difficulty: 1,
      questions: [
        { question: ac1, choices: [] },
        { question: ac2, choices: [] },
      ],
      answers: [
        { question: ac1, answer: ac2, isCorrect: false },
        { question: ac2, answer: ac2, isCorrect: true },
      ],
    }

    expect(isDone(game)).toEqual(true)
  })

  it('returns false when not all questions have answers', () => {
    const ac1 = mockAreaCode()
    const ac2 = mockAreaCode()
    const ac3 = mockAreaCode()

    // 3 questions, only 2 answers
    const game: Game = {
      startedAt: new Date(),
      difficulty: 1,
      questions: [
        { question: ac1, choices: [] },
        { question: ac2, choices: [] },
        { question: ac3, choices: [] },
      ],
      answers: [
        { question: ac1, answer: ac2, isCorrect: false },
        { question: ac2, answer: ac2, isCorrect: true },
      ],
    }

    expect(isDone(game)).toEqual(false)
  })
})

describe('difficultyStr2Int()', () => {
  it('generates the right difficulty numbers', () => {
    expect(difficultyStr2Int('easy')).toEqual(1)
    expect(difficultyStr2Int('medium')).toEqual(2)
    expect(difficultyStr2Int('hard')).toEqual(3)
  })

  it('throws on incorrect difficulty string', () => {
    const f = () => difficultyStr2Int('wrong')
    expect(f).toThrow()
  })
})

describe('generateNewGameState()', () => {
  it('generates a startedAt date', () => {
    const r = generateNewGameState(2)
    expect(r.startedAt instanceof Date).toEqual(true)
  })

  it('generates 3 answers for each question', () => {
    const r = generateNewGameState(2)
    r.questions.forEach((q) => {
      expect(q.choices.length).toEqual(3)
    })
  })

  it('generates 2 different answers', () => {
    const r = generateNewGameState(2)

    r.questions.forEach((q) => {
      // 0->1 and 1->0
      expect(q.choices[0]).not.toEqual(q.choices[1])

      // 0->2 and 2->0
      expect(q.choices[0]).not.toEqual(q.choices[2])

      // 1->2 and 2->1
      expect(q.choices[1]).not.toEqual(q.choices[2])
    })
  })

  it('generates 1 correct answer', () => {
    const r = generateNewGameState(2)

    r.questions.forEach((q) => {
      const rightAnswer = q.question

      expect(
        rightAnswer === q.choices[0] ||
          rightAnswer === q.choices[1] ||
          rightAnswer === q.choices[2],
      )
    })
  })

  it('generates 10 questions difficulty=easy', () => {
    const r = generateNewGameState(1)
    expect(r.questions.length).toEqual(10)
  })

  it('generates 20 questions difficulty=medium', () => {
    const r = generateNewGameState(2)
    expect(r.questions.length).toEqual(20)
  })

  it('generates 20 questions difficulty=hard', () => {
    const r = generateNewGameState(3)
    expect(r.questions.length).toEqual(20)
  })
})

describe('getDataByDifficulty()', () => {
  it('returns only code.length=1 districts when difficulty=easy', () => {
    const data = clone(DATA)
    const result = getDataByDifficulty(1, data)
    expect(
      result.every((ac: AreaCode) => ac.code.length === 1),
    ).toEqual(true)
  })

  it('returns only code.length=2 districts when difficulty=medium', () => {
    const data = clone(DATA)
    const result = getDataByDifficulty(2, data)
    expect(
      result.every((ac: AreaCode) => ac.code.length === 2),
    ).toEqual(true)
  })

  it('returns no code.length=1 districts when difficulty=hard', () => {
    const data = clone(DATA)
    const result = getDataByDifficulty(3, data)
    expect(
      result.every((ac: AreaCode) => ac.code.length !== 1),
    ).toEqual(true)
  })
})

describe('getCurrentQuestion()', () => {
  it('finds the first unanswered question', () => {
    // generate mock area codes
    const [ac1, ac2, ac3, ac4, ac5, ac6, ac7] = [
      1, 2, 3, 4, 5, 6, 7,
    ].map(mockAreaCode)

    // 3 questions, 1 answer already available
    const game: Game = {
      startedAt: new Date(),
      difficulty: 1,
      questions: [
        { question: ac1, choices: [ac4, ac1, ac5] },
        { question: ac2, choices: [ac5, ac2, ac6] },
        { question: ac3, choices: [ac6, ac3, ac7] },
      ],
      answers: [
        { question: ac1, answer: ac1, isCorrect: true },
      ],
    }

    const r = getCurrentQuestion(game)

    expect(r).toEqual({
      question: ac2,
      choices: [ac5, ac2, ac6],
    })
  })
})

describe('getLastAnswer()', () => {
  it('returns the right question,answer,choices,isCorrect', () => {
    // generate mock area codes
    const [ac1, ac2, ac3, ac4, ac5, ac6, ac7] = [
      1, 2, 3, 4, 5, 6, 7,
    ].map(mockAreaCode)

    // 3 questions, 1 answer already available
    const game: Game = {
      startedAt: new Date(),
      difficulty: 1,
      questions: [
        { question: ac1, choices: [ac4, ac1, ac5] },
        { question: ac2, choices: [ac5, ac2, ac6] },
        { question: ac3, choices: [ac6, ac3, ac7] },
      ],
      answers: [
        { question: ac1, answer: ac1, isCorrect: true },
      ],
    }

    const r = getLastAnswer(game)

    expect(r).toEqual({
      question: ac1,
      choices: [ac4, ac1, ac5],
      answer: ac1,
      isCorrect: true,
    })
  })
})

describe('answerQuestion()', () => {
  it('updates the right question', () => {
    // generate mock area codes
    const [ac1, ac2, ac3, ac4, ac5, ac6, ac7] = [
      1, 2, 3, 4, 5, 6, 7,
    ].map(mockAreaCode)

    // 3 questions, 1 answer already available
    const game: Game = {
      startedAt: new Date(),
      difficulty: 1,
      questions: [
        { question: ac1, choices: [ac4, ac1, ac5] },
        { question: ac2, choices: [ac5, ac2, ac6] },
        { question: ac3, choices: [ac6, ac3, ac7] },
      ],
      answers: [
        { question: ac1, answer: ac1, isCorrect: true },
      ],
    }
    const r = answerQuestion(game, ac2, ac6)

    expect(r).toEqual({
      ...game,
      answers: [
        { question: ac1, answer: ac1, isCorrect: true },
        { question: ac2, answer: ac6, isCorrect: false },
      ],
    })
  })
})

describe('getResults()', () => {
  it('has percentage/correct/incorrect properties', () => {
    // generate mock area codes
    const [ac1, ac2, ac3, ac4, ac5, ac6, ac7] = [
      1, 2, 3, 4, 5, 6, 7,
    ].map(mockAreaCode)

    const game: Game = {
      startedAt: new Date(),
      difficulty: 1,
      questions: [
        { question: ac1, choices: [ac4, ac1, ac5] },
        { question: ac2, choices: [ac5, ac2, ac6] },
        { question: ac3, choices: [ac6, ac3, ac7] },
      ],
      answers: [
        { question: ac1, answer: ac1, isCorrect: true },
        { question: ac2, answer: ac2, isCorrect: true },
        { question: ac3, answer: ac3, isCorrect: true },
      ],
    }

    const r = getResults(game)

    expect(r.percentage).toBeDefined()
    expect(r.correct).toBeDefined()
    expect(r.incorrect).toBeDefined()
  })

  it('returns 50% when half isCorrect=true', () => {
    // generate mock area codes
    const [ac1, ac2, ac3, ac4, ac5, ac6, ac7] = [
      1, 2, 3, 4, 5, 6, 7,
    ].map(mockAreaCode)

    const game: Game = {
      startedAt: new Date(),
      difficulty: 1,
      questions: [
        { question: ac1, choices: [ac4, ac1, ac5] },
        { question: ac2, choices: [ac5, ac2, ac6] },
        { question: ac3, choices: [ac6, ac3, ac7] },
        { question: ac4, choices: [ac6, ac4, ac7] },
      ],
      answers: [
        { question: ac1, answer: ac1, isCorrect: true },
        { question: ac2, answer: ac5, isCorrect: false },
        { question: ac3, answer: ac3, isCorrect: true },
        { question: ac4, answer: ac7, isCorrect: false },
      ],
    }

    const r = getResults(game)

    expect(r.percentage).toEqual(50)
    expect(r.correct).toEqual(2)
    expect(r.incorrect).toEqual(2)
  })
})
