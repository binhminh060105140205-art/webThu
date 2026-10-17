# webThu Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a responsive Vietnamese multiple-choice quiz web app from the attached business-law question bank.

**Architecture:** React renders a single-page quiz flow. A pure quiz module owns answer selection, scoring, and result derivation; static question data is kept separate from UI. CSS provides the editorial visual system and responsive layout.

**Tech Stack:** Vite, React, TypeScript, Vitest, plain CSS.

**Spec:** `docs/superpowers/specs/webThu-design.md`

## Global Constraints

- Quiz-only scope; no login, backend, teacher tools, or unrelated modules.
- Initial bank contains 15 representative questions from the source PDF.
- All user-facing copy is Vietnamese.
- The app must work at mobile and desktop widths.

### Task 1: Quiz domain logic

**Files:**
- Create: `src/quiz/quiz.ts`
- Test: `src/quiz/quiz.test.ts`

**Interfaces:**
- `QuizQuestion`, `QuizAnswerState`, `QuizResult`, and `calculateQuizResult()` are exported from `src/quiz/quiz.ts`.
- Tests cover unanswered questions, all-correct scoring, and mixed answers.

- [ ] Write tests for the expected score and result breakdown.
- [ ] Run `npm test -- --run src/quiz/quiz.test.ts` and observe the missing-module failure.
- [ ] Implement the minimum pure functions and types.
- [ ] Run the focused test until it passes.

### Task 2: Question bank and quiz UI

**Files:**
- Create: `src/data/questions.ts`
- Create: `src/components/QuizApp.tsx`
- Create: `src/components/QuizApp.css`
- Create: `src/main.tsx`
- Create: `src/index.css`
- Modify: `index.html`

**Interfaces:**
- `questions` exports the static `QuizQuestion[]` bank.
- `QuizApp` consumes `questions` and uses the domain functions from Task 1.

- [ ] Add 15 source-grounded questions with answer keys and explanations.
- [ ] Add start, in-progress, submit, result review, restart, and question navigation states.
- [ ] Add responsive styling and accessible button/label states.
- [ ] Run the app build and focused tests.

### Task 3: Project setup and validation

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `tsconfig.node.json`
- Create: `vite.config.ts`
- Create: `vitest.config.ts`
- Create: `.gitignore`
- Create: `README.md`

- [ ] Install dependencies.
- [ ] Run tests and production build.
- [ ] Run a local preview smoke check if the environment permits.
- [ ] Initialize git, create the GitHub repository `webThu` if GitHub authentication is available, and push the initial branch.
