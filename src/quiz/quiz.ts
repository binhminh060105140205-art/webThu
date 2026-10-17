export type OptionKey = 'a' | 'b' | 'c' | 'd'

export type QuizQuestion = {
  id: string
  sourceNumber: number
  chapter: string
  difficulty: 1 | 2 | 3
  prompt: string
  options: Record<OptionKey, string>
  correctOption: OptionKey
  explanation: string
}

export type QuizAnswerState = Record<string, OptionKey | undefined>

export type QuizResult = {
  total: number
  answered: number
  correct: number
  incorrect: number
  percentage: number
}

export function calculateQuizResult(
  questions: Array<Pick<QuizQuestion, 'id' | 'correctOption'>>,
  answers: QuizAnswerState,
): QuizResult {
  const answered = questions.filter((question) => answers[question.id] !== undefined).length
  const correct = questions.filter((question) => answers[question.id] === question.correctOption).length
  const total = questions.length

  return {
    total,
    answered,
    correct,
    incorrect: total - correct,
    percentage: total === 0 ? 0 : Math.round((correct / total) * 100),
  }
}
