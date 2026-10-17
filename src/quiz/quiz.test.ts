import { describe, expect, it } from 'vitest'
import { calculateQuizResult, selectQuestionSet } from './quiz'

const questions = [
  { id: 'q1', correctOption: 'a' as const },
  { id: 'q2', correctOption: 'c' as const },
  { id: 'q3', correctOption: 'd' as const },
]

const bank = [
  { id: 'khai-quat-1', chapter: 'Khái quát' },
  { id: 'khai-quat-2', chapter: 'Khái quát' },
  { id: 'chu-the-1', chapter: 'Chủ thể' },
  { id: 'chu-the-2', chapter: 'Chủ thể' },
  { id: 'dau-tu-1', chapter: 'Đầu tư' },
  { id: 'dau-tu-2', chapter: 'Đầu tư' },
]

describe('calculateQuizResult', () => {
  it('counts unanswered questions as incorrect without inventing answers', () => {
    const result = calculateQuizResult(questions, { q1: 'a' })

    expect(result).toEqual({
      total: 3,
      answered: 1,
      correct: 1,
      incorrect: 2,
      percentage: 33,
    })
  })

  it('returns a perfect score when every answer is correct', () => {
    const result = calculateQuizResult(questions, { q1: 'a', q2: 'c', q3: 'd' })

    expect(result.percentage).toBe(100)
    expect(result.correct).toBe(3)
    expect(result.incorrect).toBe(0)
  })

  it('handles a mixed answer set and rounds the percentage', () => {
    const result = calculateQuizResult(questions, { q1: 'b', q2: 'c' })

    expect(result).toEqual({
      total: 3,
      answered: 2,
      correct: 1,
      incorrect: 2,
      percentage: 33,
    })
  })
})

describe('selectQuestionSet', () => {
  it('selects the requested number and rotates through chapters', () => {
    const selected = selectQuestionSet(bank, 4)

    expect(selected).toHaveLength(4)
    expect(selected.map((question) => question.id)).toEqual([
      'khai-quat-1',
      'chu-the-1',
      'dau-tu-1',
      'khai-quat-2',
    ])
  })

  it('caps a request at the available question bank size', () => {
    expect(selectQuestionSet(bank, 99)).toHaveLength(bank.length)
  })
})
