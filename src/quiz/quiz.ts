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

export function selectQuestionSet<T extends { chapter: string }>(questions: T[], requestedCount: number): T[] {
  const count = Math.min(Math.max(Math.floor(requestedCount), 0), questions.length)
  const chapters = [...new Set(questions.map((question) => question.chapter))]
  const questionsByChapter = new Map(chapters.map((chapter) => [
    chapter,
    questions.filter((question) => question.chapter === chapter),
  ]))
  const selected: T[] = []
  const offsets = new Map(chapters.map((chapter) => [chapter, 0]))
  let chapterIndex = 0

  while (selected.length < count) {
    const chapter = chapters[chapterIndex % chapters.length]
    const chapterQuestions = questionsByChapter.get(chapter) ?? []
    const offset = offsets.get(chapter) ?? 0

    if (offset < chapterQuestions.length) {
      selected.push(chapterQuestions[offset])
      offsets.set(chapter, offset + 1)
    }

    chapterIndex += 1
  }

  return selected
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
