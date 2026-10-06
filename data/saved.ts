export type SavedProblem = {
  id: string;
  snippet: string;
  subject: string;
  savedAgo: string;
};

export const filters = ['All', 'Algebra', 'Geometry', 'Calculus', 'Trigonometry'];

export const savedProblems: SavedProblem[] = [
  { id: '1', snippet: '∫ x² dx', subject: 'Calculus', savedAgo: '3d ago' },
  { id: '2', snippet: '3x - 7 = 2x + 5', subject: 'Algebra', savedAgo: '4d ago' },
  { id: '3', snippet: 'Area of a triangle, b=6 h=9', subject: 'Geometry', savedAgo: '5d ago' },
  { id: '4', snippet: 'cos(2θ) = 1 - 2sin²(θ)', subject: 'Trigonometry', savedAgo: '1w ago' },
  { id: '5', snippet: 'x² - 5x + 6 = 0', subject: 'Algebra', savedAgo: '1w ago' },
  { id: '6', snippet: 'Volume of a cylinder, r=3 h=10', subject: 'Geometry', savedAgo: '2w ago' },
];
