import { useMemo, useState } from 'react'
import type { OptionKey, QuizAnswerState } from '../quiz/quiz'
import { calculateQuizResult, selectQuestionSet } from '../quiz/quiz'
import { questions } from '../data/questions'
import './QuizApp.css'

type Screen = 'landing' | 'quiz' | 'results'

const optionKeys: OptionKey[] = ['a', 'b', 'c', 'd']

const defaultQuestionCount = 10

function getResultLabel(percentage: number) {
  if (percentage >= 80) return 'Nắm bài rất tốt'
  if (percentage >= 50) return 'Đang đi đúng hướng'
  return 'Cần ôn lại thêm'
}

export function QuizApp() {
  const [screen, setScreen] = useState<Screen>('landing')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [questionCountInput, setQuestionCountInput] = useState(String(defaultQuestionCount))
  const [activeQuestions, setActiveQuestions] = useState(() => selectQuestionSet(questions, defaultQuestionCount))
  const [answers, setAnswers] = useState<QuizAnswerState>({})
  const [submittedAnswers, setSubmittedAnswers] = useState<QuizAnswerState>({})

  const requestedQuestionCount = Number(questionCountInput)
  const hasValidQuestionCount = Number.isInteger(requestedQuestionCount) && requestedQuestionCount >= 1 && requestedQuestionCount <= questions.length
  const questionCount = hasValidQuestionCount ? requestedQuestionCount : defaultQuestionCount
  const currentQuestion = activeQuestions[currentIndex]
  const quizResult = useMemo(
    () => calculateQuizResult(activeQuestions, submittedAnswers),
    [activeQuestions, submittedAnswers],
  )
  const answeredCount = Object.values(answers).filter(Boolean).length

  function startQuiz() {
    if (!hasValidQuestionCount) return

    setActiveQuestions(selectQuestionSet(questions, questionCount))
    setAnswers({})
    setSubmittedAnswers({})
    setCurrentIndex(0)
    setScreen('quiz')
  }

  function selectAnswer(option: OptionKey) {
    setAnswers((currentAnswers) => ({
      ...currentAnswers,
      [currentQuestion.id]: option,
    }))
  }

  function submitQuiz() {
    setSubmittedAnswers(answers)
    setScreen('results')
  }

  function goHome() {
    setScreen('landing')
    setCurrentIndex(0)
  }

  if (screen === 'landing') {
    return (
      <main className="app-shell landing-shell">
        <header className="topbar">
          <button className="brand" onClick={goHome} aria-label="Về trang đầu webThu">
            <span className="brand-mark">wt</span>
            <span>webThu</span>
          </button>
          <span className="topbar-note">Bộ luyện tập pháp lý</span>
        </header>

        <section className="landing-grid">
          <div className="landing-copy">
            <p className="eyebrow">01 / LUẬT KINH DOANH</p>
            <h1>Học luật.<br /><em>Làm bài.</em><br />Nhớ lâu hơn.</h1>
            <p className="lede">
              Một phiên luyện trắc nghiệm ngắn, tập trung vào những khái niệm cốt lõi trong tài liệu Luật kinh doanh.
            </p>
            <div className="source-note">
              <span className="source-dot" />
              <span>{questionCount} câu chọn lọc từ tài liệu PDF</span>
            </div>
            <div className="practice-options">
              <label className="section-kicker" htmlFor="question-count">SỐ CÂU MUỐN ÔN</label>
              <div className="count-input-wrap">
                <input
                  id="question-count"
                  type="number"
                  min="1"
                  max={questions.length}
                  value={questionCountInput}
                  onChange={(event) => setQuestionCountInput(event.target.value)}
                  aria-describedby="question-count-help"
                />
                <span>trong {questions.length} câu</span>
              </div>
              <p className={`count-help ${hasValidQuestionCount ? '' : 'has-error'}`} id="question-count-help">
                {hasValidQuestionCount ? 'Các câu sẽ được chia đều giữa các chủ đề.' : `Nhập số từ 1 đến ${questions.length}.`}
              </p>
            </div>
            <button className="primary-button start-button" onClick={startQuiz} disabled={!hasValidQuestionCount}>
              Bắt đầu luyện tập <span aria-hidden="true">↗</span>
            </button>
          </div>

          <div className="landing-card-wrap">
            <div className="paper-card">
              <div className="paper-card-top">
                <span className="mini-label">PHIÊN HỌC 01</span>
                <span className="paper-card-date">WEBTHU / 2026</span>
              </div>
              <div className="paper-card-stamp">QUIZ<br />READY</div>
              <p className="paper-card-kicker">Tài liệu học phần</p>
              <h2>Luật<br />kinh doanh</h2>
              <div className="paper-card-divider" />
              <div className="paper-card-meta">
                <span><strong>15</strong> câu hỏi</span>
                <span><strong>03</strong> chủ đề</span>
                <span><strong>01</strong> lượt luyện</span>
              </div>
              <p className="paper-card-footer">Khái quát / Chủ thể / Đầu tư</p>
            </div>
            <div className="accent-scribble" aria-hidden="true">ôn kỹ<br />nhớ lâu</div>
          </div>
        </section>

        <footer className="landing-footer">
          <span>Được thiết kế cho việc tự ôn tập</span>
          <span>Không cần đăng nhập</span>
          <span>Responsive trên mọi thiết bị</span>
        </footer>
      </main>
    )
  }

  if (screen === 'results') {
    return (
      <main className="app-shell results-shell">
        <header className="topbar">
          <button className="brand" onClick={goHome} aria-label="Về trang đầu webThu">
            <span className="brand-mark">wt</span>
            <span>webThu</span>
          </button>
          <span className="topbar-note">Kết quả phiên luyện</span>
        </header>

        <section className="results-layout">
          <div className="result-hero">
            <p className="eyebrow">PHIÊN LUYỆN ĐÃ HOÀN TẤT</p>
            <h1>{getResultLabel(quizResult.percentage)}<br /><em>nhé!</em></h1>
            <p className="result-subtitle">Bạn đã hoàn thành bài luyện Luật kinh doanh. Xem lại từng câu để củng cố kiến thức.</p>
            <div className="score-orbit">
              <div className="score-circle">
                <strong>{quizResult.percentage}</strong>
                <span>điểm %</span>
              </div>
            </div>
            <div className="result-actions">
              <button className="primary-button" onClick={startQuiz}>Làm lại bài</button>
              <button className="text-button" onClick={goHome}>Về trang đầu <span aria-hidden="true">↗</span></button>
            </div>
          </div>

          <div className="result-review">
            <div className="stats-row">
              <div><strong>{quizResult.correct}</strong><span>Đúng</span></div>
              <div><strong>{quizResult.incorrect}</strong><span>Chưa đúng</span></div>
              <div><strong>{quizResult.answered}</strong><span>Đã trả lời</span></div>
            </div>
            <div className="review-heading">
              <div>
                <span className="section-kicker">XEM LẠI BÀI LÀM</span>
                <h2>Đi qua từng câu</h2>
              </div>
              <span className="review-count">{activeQuestions.length} câu</span>
            </div>
            <div className="review-list">
              {activeQuestions.map((question, index) => {
                const answer = submittedAnswers[question.id]
                const isCorrect = answer === question.correctOption
                return (
                  <article className={`review-item ${isCorrect ? 'is-correct' : 'is-wrong'}`} key={question.id}>
                    <div className="review-number">{String(index + 1).padStart(2, '0')}</div>
                    <div className="review-content">
                      <div className="review-meta">
                        <span>{question.chapter}</span>
                        <span className="review-status">{isCorrect ? 'Đúng' : 'Xem lại'}</span>
                      </div>
                      <h3>{question.prompt}</h3>
                      <p>{isCorrect ? `Bạn chọn: ${question.options[answer as OptionKey]}` : `Đáp án đúng: ${question.options[question.correctOption]}`}</p>
                      <div className="review-explanation">{question.explanation}</div>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </section>
      </main>
    )
  }

  const progress = ((currentIndex + 1) / activeQuestions.length) * 100
  const currentAnswer = answers[currentQuestion.id]

  return (
    <main className="app-shell quiz-shell">
      <header className="topbar quiz-topbar">
        <button className="brand" onClick={goHome} aria-label="Về trang đầu webThu">
          <span className="brand-mark">wt</span>
          <span>webThu</span>
        </button>
        <div className="quiz-title"><span>PHIÊN LUYỆN 01</span><strong>Luật kinh doanh</strong></div>
        <button className="quit-button" onClick={goHome}>Thoát bài</button>
      </header>

      <div className="progress-line" aria-label={`Đã đến câu ${currentIndex + 1} trên ${activeQuestions.length}`}>
        <span style={{ width: `${progress}%` }} />
      </div>

      <section className="quiz-layout">
        <div className="question-column">
          <div className="question-head">
            <div>
              <span className="eyebrow">CÂU {String(currentIndex + 1).padStart(2, '0')} / {String(activeQuestions.length).padStart(2, '0')}</span>
              <div className="question-tags">
                <span>{currentQuestion.chapter}</span>
                <span>Độ khó {currentQuestion.difficulty}</span>
              </div>
            </div>
            <span className="question-source">Nguồn câu {currentQuestion.sourceNumber}</span>
          </div>

          <article className="question-card">
            <h1>{currentQuestion.prompt}</h1>
            <div className="option-list">
              {optionKeys.map((option) => (
                <button
                  className={`option-button ${currentAnswer === option ? 'is-selected' : ''}`}
                  key={option}
                  onClick={() => selectAnswer(option)}
                  aria-pressed={currentAnswer === option}
                >
                  <span className="option-letter">{option}</span>
                  <span>{currentQuestion.options[option]}</span>
                  <span className="option-check" aria-hidden="true">{currentAnswer === option ? '✓' : ''}</span>
                </button>
              ))}
            </div>
          </article>

          <div className="question-navigation">
            <button className="secondary-button" onClick={() => setCurrentIndex((index) => Math.max(0, index - 1))} disabled={currentIndex === 0}>
              <span aria-hidden="true">←</span> Câu trước
            </button>
            {currentIndex === activeQuestions.length - 1 ? (
              <button className="primary-button" onClick={submitQuiz}>Nộp bài <span aria-hidden="true">↗</span></button>
            ) : (
              <button className="primary-button" onClick={() => setCurrentIndex((index) => Math.min(activeQuestions.length - 1, index + 1))}>Câu tiếp <span aria-hidden="true">→</span></button>
            )}
          </div>
        </div>

        <aside className="question-sidebar">
          <div className="sidebar-summary">
            <div>
              <span className="section-kicker">TIẾN ĐỘ</span>
              <strong>{answeredCount}/{activeQuestions.length}</strong>
            </div>
            <span className="sidebar-summary-note">đã trả lời</span>
          </div>
          <div className="question-map">
            <div className="map-heading"><span>CÂU HỎI</span><span>CHỌN ĐỂ ĐI ĐẾN</span></div>
            <div className="map-grid">
              {activeQuestions.map((question, index) => (
                <button
                  className={`map-button ${index === currentIndex ? 'is-current' : ''} ${answers[question.id] ? 'is-answered' : ''}`}
                  key={question.id}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Đi đến câu ${index + 1}`}
                >
                  {String(index + 1).padStart(2, '0')}
                </button>
              ))}
            </div>
          </div>
          <div className="sidebar-tip">
            <span className="tip-icon">i</span>
            <p>Bạn có thể quay lại câu cũ bất cứ lúc nào trước khi nộp bài.</p>
          </div>
          <button className="sidebar-submit" onClick={submitQuiz}>Nộp bài <span aria-hidden="true">↗</span></button>
        </aside>
      </section>
    </main>
  )
}
