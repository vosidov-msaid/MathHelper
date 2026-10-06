import type { Ionicons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';

type IconName = ComponentProps<typeof Ionicons>['name'];

export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export type QuizQuestion = {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

export type Quiz = {
  id: string;
  title: string;
  subject: string;
  difficulty: Difficulty;
  icon: IconName;
  questions: QuizQuestion[];
};

export const quizzes: Quiz[] = [
  // ---------- EASY ----------
  {
    id: 'basic-arithmetic',
    title: 'Basic Arithmetic',
    subject: 'Arithmetic',
    difficulty: 'Easy',
    icon: 'calculator',
    questions: [
      {
        id: 'q1',
        prompt: 'What is 47 + 28?',
        options: ['65', '75', '85', '95'],
        correctIndex: 1,
        explanation: '47 + 28 = 75. Add the ones (7 + 8 = 15, write 5 carry 1), then the tens (4 + 2 + 1 = 7).',
      },
      {
        id: 'q2',
        prompt: 'What is 9 × 7?',
        options: ['56', '63', '72', '81'],
        correctIndex: 1,
        explanation: '9 × 7 = 63.',
      },
      {
        id: 'q3',
        prompt: 'What is 144 ÷ 12?',
        options: ['10', '11', '12', '13'],
        correctIndex: 2,
        explanation: '12 × 12 = 144, so 144 ÷ 12 = 12.',
      },
      {
        id: 'q4',
        prompt: 'What is 200 - 86?',
        options: ['104', '114', '124', '134'],
        correctIndex: 1,
        explanation: '200 - 86 = 114.',
      },
      {
        id: 'q5',
        prompt: 'Which number is a multiple of both 4 and 6?',
        options: ['10', '14', '18', '24'],
        correctIndex: 3,
        explanation: '24 is divisible by 4 (24 ÷ 4 = 6) and by 6 (24 ÷ 6 = 4). 18 divides evenly by 6 but not by 4.',
      },
    ],
  },
  {
    id: 'fractions-basics',
    title: 'Fractions Basics',
    subject: 'Fractions',
    difficulty: 'Easy',
    icon: 'pie-chart',
    questions: [
      {
        id: 'q1',
        prompt: 'What is 1/2 + 1/4?',
        options: ['1/6', '2/6', '3/4', '1/3'],
        correctIndex: 2,
        explanation: 'Convert 1/2 to 2/4, then 2/4 + 1/4 = 3/4.',
      },
      {
        id: 'q2',
        prompt: 'Simplify 8/12.',
        options: ['1/2', '2/3', '3/4', '4/6'],
        correctIndex: 1,
        explanation: 'The greatest common factor of 8 and 12 is 4: 8 ÷ 4 = 2, 12 ÷ 4 = 3, giving 2/3.',
      },
      {
        id: 'q3',
        prompt: 'What is 3/5 of 20?',
        options: ['8', '10', '12', '15'],
        correctIndex: 2,
        explanation: '3/5 × 20 = 60/5 = 12.',
      },
      {
        id: 'q4',
        prompt: 'Which fraction is largest?',
        options: ['2/5', '1/2', '3/8', '5/12'],
        correctIndex: 1,
        explanation: '1/2 = 0.5, which is larger than 2/5 (0.4), 3/8 (0.375), and 5/12 (about 0.417).',
      },
      {
        id: 'q5',
        prompt: 'What is 2/3 × 3/4?',
        options: ['1/2', '5/7', '6/7', '2/4'],
        correctIndex: 0,
        explanation: '2/3 × 3/4 = 6/12, which simplifies to 1/2.',
      },
    ],
  },
  {
    id: 'basic-geometry-quiz',
    title: 'Basic Geometry',
    subject: 'Geometry',
    difficulty: 'Easy',
    icon: 'shapes',
    questions: [
      {
        id: 'q1',
        prompt: 'How many degrees are in a right angle?',
        options: ['45°', '90°', '180°', '360°'],
        correctIndex: 1,
        explanation: 'A right angle measures exactly 90°.',
      },
      {
        id: 'q2',
        prompt: 'What is the perimeter of a rectangle with length 7 and width 3?',
        options: ['10', '17', '20', '21'],
        correctIndex: 2,
        explanation: 'P = 2(l + w) = 2(7 + 3) = 20.',
      },
      {
        id: 'q3',
        prompt: 'What is the area of a square with side 6?',
        options: ['12', '24', '36', '42'],
        correctIndex: 2,
        explanation: 'Area of a square = side² = 6² = 36.',
      },
      {
        id: 'q4',
        prompt: 'A triangle has angles 60° and 70°. What is the third angle?',
        options: ['40°', '50°', '60°', '70°'],
        correctIndex: 1,
        explanation: 'A triangle’s angles sum to 180°. 180 - 60 - 70 = 50°.',
      },
      {
        id: 'q5',
        prompt: 'How many sides does a hexagon have?',
        options: ['5', '6', '7', '8'],
        correctIndex: 1,
        explanation: 'A hexagon has 6 sides.',
      },
    ],
  },

  // ---------- MEDIUM ----------
  {
    id: 'integers-order-ops',
    title: 'Integers & Order of Operations',
    subject: 'Pre-Algebra',
    difficulty: 'Medium',
    icon: 'bulb',
    questions: [
      {
        id: 'q1',
        prompt: 'What is -5 + 8?',
        options: ['-13', '-3', '3', '13'],
        correctIndex: 2,
        explanation: '-5 + 8 moves 8 units to the right from -5, landing on 3.',
      },
      {
        id: 'q2',
        prompt: 'Evaluate 2 + 3 × 4.',
        options: ['14', '20', '24', '11'],
        correctIndex: 0,
        explanation: 'Multiply first (PEMDAS): 3 × 4 = 12, then add 2, giving 14.',
      },
      {
        id: 'q3',
        prompt: 'What is -6 × -4?',
        options: ['-24', '-10', '10', '24'],
        correctIndex: 3,
        explanation: 'A negative times a negative is positive: 6 × 4 = 24.',
      },
      {
        id: 'q4',
        prompt: 'Evaluate (5 - 2)² + 1.',
        options: ['8', '9', '10', '16'],
        correctIndex: 2,
        explanation: '(5 - 2)² = 3² = 9, then 9 + 1 = 10.',
      },
      {
        id: 'q5',
        prompt: 'What is |-12| - |5|?',
        options: ['-7', '7', '-17', '17'],
        correctIndex: 1,
        explanation: '|-12| = 12 and |5| = 5, so 12 - 5 = 7.',
      },
    ],
  },
  {
    id: 'ratios-percentages',
    title: 'Ratios & Percentages',
    subject: 'Ratios',
    difficulty: 'Medium',
    icon: 'swap-horizontal',
    questions: [
      {
        id: 'q1',
        prompt: 'A recipe uses 2 cups flour for every 3 cups sugar. How much flour for 9 cups sugar?',
        options: ['4', '5', '6', '7'],
        correctIndex: 2,
        explanation: 'The ratio 2:3 scaled by 3 (since 9 ÷ 3 = 3) gives 2 × 3 = 6 cups of flour.',
      },
      {
        id: 'q2',
        prompt: 'What is 20% of 150?',
        options: ['20', '25', '30', '35'],
        correctIndex: 2,
        explanation: '20% = 0.20, and 0.20 × 150 = 30.',
      },
      {
        id: 'q3',
        prompt: 'A shirt costs $40 and is discounted 25%. What is the sale price?',
        options: ['$25', '$28', '$30', '$35'],
        correctIndex: 2,
        explanation: '25% of 40 is 10, so the sale price is 40 - 10 = $30.',
      },
      {
        id: 'q4',
        prompt: 'If 15 out of 25 students passed a test, what percent passed?',
        options: ['50%', '60%', '65%', '75%'],
        correctIndex: 1,
        explanation: '15/25 = 0.60 = 60%.',
      },
      {
        id: 'q5',
        prompt: 'A map has a scale of 1 cm : 5 km. How many km does 8 cm represent?',
        options: ['13', '35', '40', '45'],
        correctIndex: 2,
        explanation: '8 × 5 = 40 km.',
      },
    ],
  },
  {
    id: 'algebra-1-essentials',
    title: 'Algebra I Essentials',
    subject: 'Algebra',
    difficulty: 'Medium',
    icon: 'school',
    questions: [
      {
        id: 'q1',
        prompt: 'Solve 2x + 3 = 11.',
        options: ['x = 3', 'x = 4', 'x = 5', 'x = 6'],
        correctIndex: 1,
        explanation: 'Subtract 3: 2x = 8, then divide by 2: x = 4.',
      },
      {
        id: 'q2',
        prompt: 'Solve 5x - 7 = 3x + 5.',
        options: ['x = 4', 'x = 5', 'x = 6', 'x = 7'],
        correctIndex: 2,
        explanation: 'Subtract 3x from both sides: 2x - 7 = 5. Add 7: 2x = 12, so x = 6.',
      },
      {
        id: 'q3',
        prompt: 'What is the slope of the line through (2, 3) and (4, 9)?',
        options: ['2', '3', '4', '6'],
        correctIndex: 1,
        explanation: 'm = (9 - 3)/(4 - 2) = 6/2 = 3.',
      },
      {
        id: 'q4',
        prompt: 'Solve the inequality 3x - 2 > 7.',
        options: ['x > 2', 'x > 3', 'x > 5', 'x > 9'],
        correctIndex: 1,
        explanation: 'Add 2: 3x > 9. Divide by 3: x > 3.',
      },
      {
        id: 'q5',
        prompt: 'What is the y-intercept of y = 4x - 9?',
        options: ['-9', '-4', '4', '9'],
        correctIndex: 0,
        explanation: 'In slope-intercept form y = mx + b, b is the y-intercept, which is -9 here.',
      },
    ],
  },
  {
    id: 'triangles-circles',
    title: 'Triangles & Circles',
    subject: 'Geometry',
    difficulty: 'Medium',
    icon: 'triangle',
    questions: [
      {
        id: 'q1',
        prompt: 'A right triangle has legs 3 and 4. What is the hypotenuse?',
        options: ['5', '6', '7', '8'],
        correctIndex: 0,
        explanation: '3² + 4² = 25, and the square root of 25 is 5 (the classic 3-4-5 triangle).',
      },
      {
        id: 'q2',
        prompt: 'What is the circumference of a circle with radius 4 (use π ≈ 3.14)?',
        options: ['12.56', '25.12', '50.24', '6.28'],
        correctIndex: 1,
        explanation: 'C = 2πr = 2 × 3.14 × 4 = 25.12.',
      },
      {
        id: 'q3',
        prompt: 'What is the area of a circle with radius 5 (use π ≈ 3.14)?',
        options: ['15.7', '31.4', '62.8', '78.5'],
        correctIndex: 3,
        explanation: 'A = πr² = 3.14 × 25 = 78.5.',
      },
      {
        id: 'q4',
        prompt: 'Two triangles have equal angles of 40°, 60°, and 80°. What can you conclude?',
        options: ['They are congruent', 'They are similar', 'They have equal area', 'Nothing can be concluded'],
        correctIndex: 1,
        explanation: 'Equal corresponding angles (AA) guarantees similarity, but not necessarily congruence (same size).',
      },
      {
        id: 'q5',
        prompt: 'An isosceles triangle has a base angle of 50°. What is the vertex angle?',
        options: ['50°', '65°', '80°', '100°'],
        correctIndex: 2,
        explanation: 'Both base angles are 50°, summing to 100°, so the vertex angle is 180 - 100 = 80°.',
      },
    ],
  },
  {
    id: 'statistics-basics',
    title: 'Statistics Basics',
    subject: 'Statistics',
    difficulty: 'Medium',
    icon: 'stats-chart',
    questions: [
      {
        id: 'q1',
        prompt: 'Find the mean of 2, 4, 6, 8, 10.',
        options: ['5', '6', '7', '8'],
        correctIndex: 1,
        explanation: 'The sum is 30, and 30 ÷ 5 = 6.',
      },
      {
        id: 'q2',
        prompt: 'Find the median of 3, 9, 4, 1, 7.',
        options: ['3', '4', '7', '9'],
        correctIndex: 1,
        explanation: 'Sorted, the values are 1, 3, 4, 7, 9 — the middle value is 4.',
      },
      {
        id: 'q3',
        prompt: 'A fair die is rolled once. What is the probability of rolling an even number?',
        options: ['1/6', '1/3', '1/2', '2/3'],
        correctIndex: 2,
        explanation: '3 of the 6 outcomes (2, 4, 6) are even: 3/6 = 1/2.',
      },
      {
        id: 'q4',
        prompt: 'What is the range of 12, 5, 19, 7, 15?',
        options: ['7', '12', '14', '19'],
        correctIndex: 2,
        explanation: 'Range = max - min = 19 - 5 = 14.',
      },
      {
        id: 'q5',
        prompt: 'A bag has 3 red and 7 blue marbles. What is P(blue)?',
        options: ['3/10', '1/2', '7/10', '7/3'],
        correctIndex: 2,
        explanation: '7 blue marbles out of 10 total: 7/10.',
      },
    ],
  },

  // ---------- HARD ----------
  {
    id: 'algebra-2-challenge',
    title: 'Algebra II Challenge',
    subject: 'Algebra',
    difficulty: 'Hard',
    icon: 'layers',
    questions: [
      {
        id: 'q1',
        prompt: 'Solve x² - 7x + 12 = 0.',
        options: ['x = 2, 5', 'x = 3, 4', 'x = 1, 12', 'x = -3, -4'],
        correctIndex: 1,
        explanation: 'The factors of 12 that sum to 7 are 3 and 4: (x - 3)(x - 4) = 0.',
      },
      {
        id: 'q2',
        prompt: 'Factor x² - 16.',
        options: ['(x - 4)²', '(x - 8)(x + 2)', '(x - 4)(x + 4)', '(x - 16)(x + 1)'],
        correctIndex: 2,
        explanation: 'This is a difference of squares: x² - 4² = (x - 4)(x + 4).',
      },
      {
        id: 'q3',
        prompt: 'Simplify (x² - 9)/(x - 3).',
        options: ['x + 3', 'x - 3', 'x + 9', 'x² - 3'],
        correctIndex: 0,
        explanation: 'x² - 9 factors to (x - 3)(x + 3); canceling (x - 3) leaves x + 3, for x ≠ 3.',
      },
      {
        id: 'q4',
        prompt: 'Solve log base 3 of x = 4.',
        options: ['x = 12', 'x = 27', 'x = 64', 'x = 81'],
        correctIndex: 3,
        explanation: 'log₃(x) = 4 means 3⁴ = x, and 3⁴ = 81.',
      },
      {
        id: 'q5',
        prompt: 'What is the discriminant of 2x² + 3x - 5 = 0?',
        options: ['9', '29', '49', '89'],
        correctIndex: 2,
        explanation: 'The discriminant is b² - 4ac = 3² - 4(2)(-5) = 9 + 40 = 49.',
      },
    ],
  },
  {
    id: 'trig-quiz',
    title: 'Trigonometry',
    subject: 'Trigonometry',
    difficulty: 'Hard',
    icon: 'triangle',
    questions: [
      {
        id: 'q1',
        prompt: 'In a right triangle, sin(θ) = 3/5. What is cos(θ)? (θ is acute)',
        options: ['3/5', '4/5', '5/4', '5/3'],
        correctIndex: 1,
        explanation: 'This is a 3-4-5 triangle: opposite = 3, hypotenuse = 5, so adjacent = 4, giving cos(θ) = 4/5.',
      },
      {
        id: 'q2',
        prompt: 'What is tan(45°)?',
        options: ['0', '1/2', '1', 'the square root of 2'],
        correctIndex: 2,
        explanation: 'At 45°, the opposite and adjacent sides are equal, so tan(45°) = 1.',
      },
      {
        id: 'q3',
        prompt: 'What is sin(90°)?',
        options: ['0', '1/2', 'the square root of 2 over 2', '1'],
        correctIndex: 3,
        explanation: 'On the unit circle, 90° corresponds to the point (0, 1); sine is the y-coordinate, which is 1.',
      },
      {
        id: 'q4',
        prompt: 'Using the Pythagorean identity, if cos(θ) = 0.6, what is sin²(θ)?',
        options: ['0.28', '0.36', '0.64', '0.8'],
        correctIndex: 2,
        explanation: 'sin²(θ) + cos²(θ) = 1, so sin²(θ) = 1 - 0.36 = 0.64.',
      },
      {
        id: 'q5',
        prompt: 'What is the period of y = sin(x), in degrees?',
        options: ['90°', '180°', '270°', '360°'],
        correctIndex: 3,
        explanation: 'Sine completes one full cycle every 360°.',
      },
    ],
  },
  {
    id: 'calculus-fundamentals',
    title: 'Calculus Fundamentals',
    subject: 'Calculus',
    difficulty: 'Hard',
    icon: 'infinite',
    questions: [
      {
        id: 'q1',
        prompt: 'What is the derivative of f(x) = x³?',
        options: ['x²', '3x', '3x²', 'x⁴/4'],
        correctIndex: 2,
        explanation: 'By the power rule, the derivative of xⁿ is n·x^(n-1), so the derivative of x³ is 3x².',
      },
      {
        id: 'q2',
        prompt: 'What is the limit as x approaches 2 of (x² - 4)/(x - 2)?',
        options: ['0', '2', '4', 'undefined'],
        correctIndex: 2,
        explanation: 'Factor: (x - 2)(x + 2)/(x - 2) = x + 2. As x approaches 2, this approaches 4.',
      },
      {
        id: 'q3',
        prompt: 'What is the derivative of f(x) = 5x² - 3x + 7?',
        options: ['10x - 3', '5x - 3', '10x + 7', '10x² - 3'],
        correctIndex: 0,
        explanation: 'The derivative of 5x² is 10x, of -3x is -3, and of the constant 7 is 0.',
      },
      {
        id: 'q4',
        prompt: 'What is the indefinite integral of 2x dx?',
        options: ['x² + C', '2x² + C', 'x + C', 'x²/2 + C'],
        correctIndex: 0,
        explanation: 'The integral of 2x dx is 2 times x²/2, which is x² + C.',
      },
      {
        id: 'q5',
        prompt: "At a critical point where f'(x) = 0, what might this point be?",
        options: ['An asymptote', 'A local max or min', 'Always a local max', 'An inflection point only'],
        correctIndex: 1,
        explanation: 'A critical point is where the derivative is zero (or undefined) — the standard place to look for a local maximum or minimum.',
      },
    ],
  },
  {
    id: 'linear-algebra-quiz',
    title: 'Linear Algebra',
    subject: 'Linear Algebra',
    difficulty: 'Hard',
    icon: 'grid',
    questions: [
      {
        id: 'q1',
        prompt: 'What is the determinant of [[2, 3], [1, 4]]?',
        options: ['2', '5', '8', '11'],
        correctIndex: 1,
        explanation: 'det = ad - bc = (2)(4) - (3)(1) = 8 - 3 = 5.',
      },
      {
        id: 'q2',
        prompt: 'What is the magnitude of the vector (6, 8)?',
        options: ['7', '8', '10', '14'],
        correctIndex: 2,
        explanation: 'The magnitude is the square root of (6² + 8²) = the square root of 100 = 10.',
      },
      {
        id: 'q3',
        prompt: 'Add the matrices [[1, 2], [3, 4]] and [[0, 1], [1, 0]].',
        options: ['[[1, 3], [4, 4]]', '[[1, 2], [3, 5]]', '[[1, 3], [3, 4]]', '[[0, 2], [3, 0]]'],
        correctIndex: 0,
        explanation: 'Add entrywise: 1+0=1, 2+1=3, 3+1=4, 4+0=4, giving [[1, 3], [4, 4]].',
      },
      {
        id: 'q4',
        prompt: 'A matrix is invertible exactly when its determinant is...',
        options: ['Zero', 'Positive', 'Negative', 'Nonzero'],
        correctIndex: 3,
        explanation: 'A matrix has an inverse if and only if its determinant is not zero.',
      },
      {
        id: 'q5',
        prompt: 'What are the dimensions of the result when multiplying a 2x3 matrix by a 3x4 matrix?',
        options: ['2x3', '2x4', '3x4', '3x3'],
        correctIndex: 1,
        explanation: 'Multiplying an (m x n) matrix by an (n x p) matrix gives an (m x p) result: 2x4.',
      },
    ],
  },
];

export function findQuiz(quizId: string): Quiz | undefined {
  return quizzes.find((quiz) => quiz.id === quizId);
}
