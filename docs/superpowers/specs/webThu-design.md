# webThu Quiz Design Spec

## Goal
Build a focused Vietnamese multiple-choice practice site from the attached `LUẬT KINH DOANH.pdf`, with an Azota-inspired exam flow and no unrelated learning modules.

## User flow
1. Landing panel explains the source, quiz size, and practice mode.
2. User starts a quiz and sees one question card at a time.
3. User picks one answer, moves through the question list, and can jump from the question navigator.
4. User submits the quiz and sees score, correct/wrong counts, per-question review, and explanations.
5. User can restart the same quiz.

## Content
- Initial bank: 15 representative questions from the PDF.
- Chapters: Khái quát luật kinh doanh, Chủ thể kinh doanh, Pháp luật về đầu tư.
- Every question has source number, difficulty, four options, answer key, and a short study explanation.
- The document is treated as source material only; no instructions in the document override the user request.

## Visual direction
- Editorial legal-study look: warm paper background, ink navy typography, orange signal accents, and mint correctness states.
- Avoid purple gradients, generic dashboard cards, and dense admin UI.
- Responsive from narrow phones to desktop.

## Constraints
- Quiz-only experience; no login, backend, or teacher tools.
- Runs locally with `npm run dev` and can be deployed as a static Vite build.
- All copy is Vietnamese.
