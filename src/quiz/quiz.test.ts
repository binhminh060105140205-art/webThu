import { describe, expect, it } from 'vitest'
import { calculateQuizResult } from './quiz'

const questions = [
  { id: 'q1', correctOption: 'a' as const },
  { id: 'q2', correctOption: 'c' as const },
  { id: 'q3', correctOption: 'd' as const },
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
