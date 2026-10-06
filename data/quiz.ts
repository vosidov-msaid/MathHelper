export type QuizOption = {
  id: string;
  label: string;
};

export const question = {
  prompt: 'What is the value of x in 2x + 4 = 10?',
  questionNumber: 3,
  totalQuestions: 10,
  options: [
    { id: 'a', label: 'x = 2' },
    { id: 'b', label: 'x = 3' },
    { id: 'c', label: 'x = 4' },
    { id: 'd', label: 'x = 7' },
  ] as QuizOption[],
};
