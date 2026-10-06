import type { Ionicons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';

type IconName = ComponentProps<typeof Ionicons>['name'];

export type Lesson = {
  id: string;
  title: string;
  summary: string;
  explanation: string;
  keyPoints: string[];
  example: {
    problem: string;
    solution: string[];
  };
};

export type Course = {
  id: string;
  title: string;
  description: string;
  icon: IconName;
  lessons: Lesson[];
};

export type Level = {
  id: string;
  title: string;
  courses: Course[];
};

export const levels: Level[] = [
  {
    id: 'elementary',
    title: 'Elementary',
    courses: [
      {
        id: 'whole-numbers',
        title: 'Whole Number Operations',
        description: 'Place value, rounding, and the four basic operations.',
        icon: 'calculator',
        lessons: [
          {
            id: 'place-value-rounding',
            title: 'Place Value & Rounding',
            summary: 'What each digit in a number is worth, and how to round.',
            explanation:
              "Place value tells you what a digit is worth based on its position in a number. Each place is 10 times the value of the place to its right. Rounding uses place value to replace a number with a simpler, approximate one.",
            keyPoints: [
              'Each position (ones, tens, hundreds, …) is 10x the value of the position to its right.',
              "To round to a given place, look at the digit immediately to its right.",
              "If that digit is 5 or more, round up; if it's less than 5, round down.",
            ],
            example: {
              problem: 'Round 4,872 to the nearest hundred.',
              solution: [
                "The hundreds digit is 8, so we're deciding between 4,800 and 4,900.",
                'Look at the tens digit, which is 7.',
                'Since 7 is 5 or more, round up.',
                '4,872 rounds to 4,900.',
              ],
            },
          },
          {
            id: 'addition-subtraction',
            title: 'Addition & Subtraction',
            summary: 'Combining quantities and finding differences with carrying and borrowing.',
            explanation:
              'Addition combines quantities, while subtraction finds the difference between them. For multi-digit numbers, line up digits by place value and carry or borrow across columns as needed.',
            keyPoints: [
              'Line up numbers by place value (ones under ones, tens under tens).',
              'When a column adds to 10 or more, carry the extra 1 to the next column.',
              'When subtracting, borrow 1 from the next column if the top digit is smaller.',
              'Check subtraction by adding your answer to the number you subtracted.',
            ],
            example: {
              problem: 'Find 527 - 348.',
              solution: [
                "Ones: 7 - 8 isn't possible, so borrow 1 ten, making it 17 - 8 = 9.",
                'Tens: borrowing left 1, so 1 - 4 needs a borrow too; borrow 1 hundred, making it 11 - 4 = 7.',
                'Hundreds: borrowing left 4, so 4 - 3 = 1.',
                '527 - 348 = 179.',
              ],
            },
          },
          {
            id: 'multiplication',
            title: 'Multiplication',
            summary: 'Repeated addition, and multiplying multi-digit numbers.',
            explanation:
              'Multiplication is repeated addition of equal groups. For multi-digit multiplication, multiply each digit of one number by each digit of the other, then add the partial products, shifting each row one place to the left.',
            keyPoints: [
              'a × b means a added to itself b times.',
              'Multiply by one digit at a time, then shift left and add the partial products.',
              'Multiplying by 10 shifts every digit one place to the left (adds a zero).',
            ],
            example: {
              problem: 'Find 23 × 14.',
              solution: ['23 × 4 = 92.', '23 × 10 = 230.', 'Add the partial products: 92 + 230 = 322.', '23 × 14 = 322.'],
            },
          },
          {
            id: 'division',
            title: 'Division',
            summary: 'Splitting totals into equal groups with long division.',
            explanation:
              "Division splits a total into equal groups and finds how many are in each group, or how many groups you can make. Long division repeats a cycle of divide, multiply, subtract, and bring down.",
            keyPoints: [
              'Division is the inverse of multiplication: if a × b = c, then c ÷ b = a.',
              'Long division cycle: divide, multiply, subtract, bring down the next digit.',
              "A remainder is what's left over when a number doesn't divide evenly.",
            ],
            example: {
              problem: 'Find 156 ÷ 12.',
              solution: [
                '12 goes into 15 once (1 × 12 = 12); subtract: 15 - 12 = 3.',
                'Bring down the 6, making 36.',
                '12 goes into 36 exactly 3 times (3 × 12 = 36); remainder 0.',
                '156 ÷ 12 = 13.',
              ],
            },
          },
        ],
      },
      {
        id: 'fractions-decimals',
        title: 'Fractions & Decimals',
        description: 'Understanding, combining, and converting fractions and decimals.',
        icon: 'pie-chart',
        lessons: [
          {
            id: 'understanding-fractions',
            title: 'Understanding Fractions',
            summary: 'What numerator and denominator mean, and simplifying fractions.',
            explanation:
              'A fraction represents a part of a whole, written as numerator/denominator. The denominator tells you how many equal parts the whole is split into, and the numerator tells you how many of those parts you have.',
            keyPoints: [
              'Numerator (top) = parts you have; denominator (bottom) = total equal parts.',
              'Equivalent fractions represent the same value, e.g. 1/2 = 2/4 = 3/6.',
              'To simplify a fraction, divide numerator and denominator by their greatest common factor.',
            ],
            example: {
              problem: 'Simplify 12/18.',
              solution: [
                'Find the greatest common factor of 12 and 18, which is 6.',
                'Divide both numerator and denominator by 6: 12÷6 = 2, 18÷6 = 3.',
                '12/18 simplifies to 2/3.',
              ],
            },
          },
          {
            id: 'adding-subtracting-fractions',
            title: 'Adding & Subtracting Fractions',
            summary: 'Finding a common denominator before combining fractions.',
            explanation:
              'To add or subtract fractions, they must share a common denominator. Find a common denominator, rewrite each fraction, then add or subtract the numerators and keep the denominator the same.',
            keyPoints: [
              'Fractions need the same denominator before you can add or subtract them.',
              'The least common denominator (LCD) is the least common multiple of the denominators.',
              'After adding or subtracting, simplify the result if possible.',
            ],
            example: {
              problem: 'Find 1/4 + 1/6.',
              solution: [
                'The LCD of 4 and 6 is 12.',
                'Rewrite: 1/4 = 3/12 and 1/6 = 2/12.',
                'Add numerators: 3/12 + 2/12 = 5/12.',
                '1/4 + 1/6 = 5/12 (already in simplest form).',
              ],
            },
          },
          {
            id: 'multiplying-dividing-fractions',
            title: 'Multiplying & Dividing Fractions',
            summary: 'Multiplying straight across, and dividing using the reciprocal.',
            explanation:
              'To multiply fractions, multiply the numerators together and the denominators together. To divide by a fraction, multiply by its reciprocal (flip the second fraction).',
            keyPoints: [
              'Multiply straight across: (a/b) × (c/d) = (a×c)/(b×d).',
              'Dividing by a fraction means multiplying by its reciprocal: (a/b) ÷ (c/d) = (a/b) × (d/c).',
              'Simplify before or after multiplying, whichever is easier.',
            ],
            example: {
              problem: 'Find 2/3 ÷ 4/9.',
              solution: [
                'Flip the second fraction: 4/9 becomes 9/4.',
                'Multiply: 2/3 × 9/4 = (2×9)/(3×4) = 18/12.',
                'Simplify 18/12 by dividing by 6: 3/2.',
                '2/3 ÷ 4/9 = 3/2.',
              ],
            },
          },
          {
            id: 'decimals-place-value',
            title: 'Decimals & Place Value',
            summary: 'Extending place value past the decimal point.',
            explanation:
              'Decimals extend place value to the right of the decimal point, where each place is one-tenth the value of the place before it (tenths, hundredths, thousandths). Decimals and fractions represent the same kinds of values in different notations.',
            keyPoints: [
              'The first digit after the decimal point is tenths, the second is hundredths, and so on.',
              'To convert a fraction with denominator 10, 100, etc. to a decimal, count the zeros to place the decimal point.',
              'To add or subtract decimals, line up the decimal points first.',
            ],
            example: {
              problem: 'Find 3.45 + 1.2.',
              solution: [
                'Line up decimal points: 3.45 and 1.20.',
                'Add hundredths: 5 + 0 = 5.',
                'Add tenths: 4 + 2 = 6.',
                'Add ones: 3 + 1 = 4.',
                '3.45 + 1.2 = 4.65.',
              ],
            },
          },
        ],
      },
      {
        id: 'basic-geometry',
        title: 'Basic Geometry & Measurement',
        description: 'Shapes, angles, perimeter, area, and unit conversion.',
        icon: 'shapes',
        lessons: [
          {
            id: 'shapes-angles',
            title: 'Shapes & Angles',
            summary: 'Naming angles by size and using angle relationships.',
            explanation:
              "Geometry starts with identifying basic shapes and measuring angles. An angle is formed by two rays sharing an endpoint, and its size is measured in degrees.",
            keyPoints: [
              'A right angle measures exactly 90°; a straight angle measures 180°.',
              'Acute angles are less than 90°; obtuse angles are between 90° and 180°.',
              'A full circle is 360°.',
            ],
            example: {
              problem: 'Two angles on a straight line measure 110° and x°. Find x.',
              solution: [
                'Angles on a straight line add up to 180°.',
                '110 + x = 180.',
                'x = 180 - 110 = 70.',
                'x = 70°.',
              ],
            },
          },
          {
            id: 'perimeter-area',
            title: 'Perimeter & Area',
            summary: 'Measuring the distance around a shape and the space inside it.',
            explanation:
              "Perimeter is the distance around a shape's edge; area is the amount of space inside it. For rectangles, perimeter = 2(length + width) and area = length × width.",
            keyPoints: [
              'Rectangle perimeter: P = 2(l + w).',
              'Rectangle area: A = l × w.',
              'Square: all sides equal, so P = 4s and A = s².',
            ],
            example: {
              problem: 'A rectangle is 8 cm long and 5 cm wide. Find its perimeter and area.',
              solution: [
                'Perimeter: P = 2(8 + 5) = 2(13) = 26 cm.',
                'Area: A = 8 × 5 = 40 cm².',
                'The rectangle has a perimeter of 26 cm and an area of 40 cm².',
              ],
            },
          },
          {
            id: 'volume-basic-solids',
            title: 'Volume of Basic Solids',
            summary: 'How much space a box or cube takes up.',
            explanation:
              'Volume measures how much space a 3D solid takes up. For a rectangular prism (box), volume equals length × width × height.',
            keyPoints: [
              'Rectangular prism volume: V = l × w × h.',
              'Cube volume: V = s³ (side length cubed).',
              'Volume is measured in cubic units, like cm³ or m³.',
            ],
            example: {
              problem: 'Find the volume of a box 4 m long, 3 m wide, and 2 m tall.',
              solution: ['V = l × w × h.', 'V = 4 × 3 × 2.', 'V = 24 m³.'],
            },
          },
          {
            id: 'units-measurement',
            title: 'Units & Measurement Conversion',
            summary: 'Converting between related units like centimeters and meters.',
            explanation:
              'Measurement conversion means rewriting a quantity in different units of the same kind, like centimeters to meters, using known conversion factors.',
            keyPoints: [
              'Metric length: 1 m = 100 cm; 1 km = 1000 m.',
              'To convert to a smaller unit, multiply; to convert to a larger unit, divide.',
              'Keep track of units throughout a calculation to avoid mistakes.',
            ],
            example: {
              problem: 'Convert 2.5 meters to centimeters.',
              solution: ['1 meter = 100 centimeters.', 'Multiply: 2.5 × 100 = 250.', '2.5 meters = 250 centimeters.'],
            },
          },
        ],
      },
    ],
  },
  {
    id: 'middle-school',
    title: 'Middle School',
    courses: [
      {
        id: 'pre-algebra',
        title: 'Pre-Algebra Foundations',
        description: 'Integers, order of operations, expressions, and simple equations.',
        icon: 'bulb',
        lessons: [
          {
            id: 'integers-absolute-value',
            title: 'Integers & Absolute Value',
            summary: 'Working with positive and negative numbers.',
            explanation:
              "Integers include positive numbers, negative numbers, and zero. Absolute value measures a number's distance from zero on the number line, so it's always non-negative.",
            keyPoints: [
              '|a| is always ≥ 0, e.g. |-5| = 5 and |5| = 5.',
              'Adding a negative number is the same as subtracting its positive value.',
              'Two negatives multiplied (or divided) give a positive result.',
            ],
            example: {
              problem: 'Find -8 + 3 and |-8 + 3|.',
              solution: [
                '-8 + 3 moves 3 units toward zero from -8.',
                '-8 + 3 = -5.',
                'The absolute value |-5| = 5.',
              ],
            },
          },
          {
            id: 'order-of-operations',
            title: 'Order of Operations',
            summary: 'Using PEMDAS to evaluate expressions correctly.',
            explanation:
              'When an expression has multiple operations, PEMDAS tells you the order to evaluate them: Parentheses, Exponents, Multiplication/Division (left to right), Addition/Subtraction (left to right).',
            keyPoints: [
              'PEMDAS: Parentheses, then Exponents, then Multiply/Divide, then Add/Subtract.',
              'Multiplication and division have equal priority; do them left to right.',
              'Addition and subtraction have equal priority; do them left to right.',
            ],
            example: {
              problem: 'Evaluate 3 + 4 × (6 - 2)².',
              solution: [
                'Parentheses first: 6 - 2 = 4.',
                'Exponent: 4² = 16.',
                'Multiply: 4 × 16 = 64.',
                'Add: 3 + 64 = 67.',
              ],
            },
          },
          {
            id: 'variables-expressions',
            title: 'Variables & Expressions',
            summary: 'Combining like terms and evaluating algebraic expressions.',
            explanation:
              "A variable is a letter that stands for an unknown or changing value. An algebraic expression combines variables, numbers, and operations, and can be evaluated once you know the variable's value.",
            keyPoints: [
              'Like terms have the same variable raised to the same power and can be combined.',
              "To evaluate an expression, substitute the given value for each variable.",
              'The distributive property: a(b + c) = ab + ac.',
            ],
            example: {
              problem: 'Evaluate 3x + 2(x - 4) when x = 5.',
              solution: [
                'Distribute: 2(x - 4) = 2x - 8.',
                'Combine like terms: 3x + 2x - 8 = 5x - 8.',
                'Substitute x = 5: 5(5) - 8 = 25 - 8 = 17.',
              ],
            },
          },
          {
            id: 'one-step-equations',
            title: 'Solving One-Step Equations',
            summary: 'Using inverse operations to isolate a variable.',
            explanation:
              'An equation states that two expressions are equal. To solve a one-step equation, undo whatever operation was done to the variable by applying the inverse operation to both sides.',
            keyPoints: [
              'Whatever you do to one side of an equation, you must do to the other.',
              'Undo addition with subtraction, and undo multiplication with division (and vice versa).',
              'Always check your solution by substituting it back into the original equation.',
            ],
            example: {
              problem: 'Solve x + 9 = 15.',
              solution: ['Subtract 9 from both sides: x + 9 - 9 = 15 - 9.', 'x = 6.', 'Check: 6 + 9 = 15. Correct.'],
            },
          },
        ],
      },
      {
        id: 'ratios-proportions',
        title: 'Ratios, Rates & Proportions',
        description: 'Unit rates, proportions, percentages, and scale.',
        icon: 'swap-horizontal',
        lessons: [
          {
            id: 'ratios-unit-rates',
            title: 'Ratios & Unit Rates',
            summary: 'Comparing quantities and simplifying to a per-unit rate.',
            explanation:
              'A ratio compares two quantities, written as a:b or a/b. A unit rate is a ratio simplified so the second quantity is 1, like miles per hour.',
            keyPoints: [
              'A ratio a:b compares a to b and can be simplified like a fraction.',
              'A unit rate expresses a quantity per one unit of another, e.g. dollars per item.',
              'To find a unit rate, divide the first quantity by the second.',
            ],
            example: {
              problem: 'A car travels 240 miles in 4 hours. Find its unit rate in miles per hour.',
              solution: ['Unit rate = total miles ÷ total hours.', '240 ÷ 4 = 60.', 'The car travels at 60 miles per hour.'],
            },
          },
          {
            id: 'proportional-relationships',
            title: 'Proportional Relationships',
            summary: 'Solving proportions with cross-multiplication.',
            explanation:
              'Two quantities are proportional if their ratio stays constant. A proportion is an equation stating two ratios are equal, and it can be solved using cross-multiplication.',
            keyPoints: [
              'A proportion: a/b = c/d.',
              'Cross-multiplication: a × d = b × c.',
              'In a proportional relationship y = kx, k is the constant of proportionality.',
            ],
            example: {
              problem: 'Solve the proportion 3/4 = x/20.',
              solution: ['Cross-multiply: 3 × 20 = 4 × x.', '60 = 4x.', 'Divide both sides by 4: x = 15.'],
            },
          },
          {
            id: 'percentages',
            title: 'Percentages',
            summary: 'Converting percents to decimals and finding a percentage of a number.',
            explanation:
              'Percent means "per hundred." To convert a percent to a decimal, divide by 100; to find a percentage of a number, multiply the number by the decimal form of the percent.',
            keyPoints: [
              'To convert a percent to a decimal, divide by 100 (move the decimal point two places left).',
              '"Of" usually means multiply in percent problems.',
              'Percent change = (new value - original value) ÷ original value × 100%.',
            ],
            example: {
              problem: 'Find 35% of 80.',
              solution: ['Convert 35% to a decimal: 35 ÷ 100 = 0.35.', 'Multiply: 0.35 × 80 = 28.', '35% of 80 is 28.'],
            },
          },
          {
            id: 'scale-similar-figures',
            title: 'Scale & Similar Figures',
            summary: 'Using a scale factor to resize similar shapes.',
            explanation:
              'Similar figures have the same shape but different sizes; their corresponding side lengths are proportional. A scale factor describes how much larger or smaller one figure is compared to another.',
            keyPoints: [
              'Similar figures have equal corresponding angles and proportional corresponding sides.',
              'Scale factor = (new length) ÷ (original length).',
              "Multiply every side length by the scale factor to find the new figure's dimensions.",
            ],
            example: {
              problem: 'A triangle with a 6 cm side is enlarged by a scale factor of 2.5. Find the new side length.',
              solution: ['New length = original length × scale factor.', 'New length = 6 × 2.5.', 'New length = 15 cm.'],
            },
          },
        ],
      },
      {
        id: 'ms-geometry',
        title: 'Middle School Geometry',
        description: 'Angle relationships, area, surface area, volume, and the coordinate plane.',
        icon: 'triangle',
        lessons: [
          {
            id: 'angle-relationships',
            title: 'Angle Relationships',
            summary: 'Vertical, complementary, and supplementary angle pairs.',
            explanation:
              'When lines intersect or are crossed by a transversal, special angle pairs are formed with predictable relationships, like vertical angles and complementary or supplementary angles.',
            keyPoints: [
              'Vertical angles (across from each other at an intersection) are always equal.',
              'Complementary angles add up to 90°; supplementary angles add up to 180°.',
              'Angles on a straight line are supplementary.',
            ],
            example: {
              problem: 'Two angles are complementary. One measures 37°. Find the other.',
              solution: ['Complementary angles sum to 90°.', '90 - 37 = 53.', 'The other angle measures 53°.'],
            },
          },
          {
            id: 'area-polygons-circles',
            title: 'Area of Polygons & Circles',
            summary: 'Formulas for triangle and circle area.',
            explanation:
              'Different shapes have different area formulas: triangles use half the base times height, and circles use π times the radius squared.',
            keyPoints: [
              'Triangle area: A = half × base × height.',
              'Circle area: A = πr², where r is the radius.',
              'Circle circumference: C = 2πr.',
            ],
            example: {
              problem: 'Find the area of a circle with radius 7 cm (use π ≈ 3.14).',
              solution: ['A = πr².', 'A ≈ 3.14 × 7².', 'A ≈ 3.14 × 49.', 'A ≈ 153.86 cm².'],
            },
          },
          {
            id: 'surface-area-volume',
            title: 'Surface Area & Volume',
            summary: 'Finding the total face area and enclosed space of 3D solids.',
            explanation:
              'Surface area is the total area of all the faces of a 3D solid; volume is the space it encloses. For a rectangular prism, surface area adds up the areas of all six faces.',
            keyPoints: [
              'Rectangular prism surface area: SA = 2(lw + lh + wh).',
              'Rectangular prism volume: V = l × w × h.',
              'Cylinder volume: V = πr²h.',
            ],
            example: {
              problem: 'Find the volume of a cylinder with radius 3 cm and height 10 cm (use π ≈ 3.14).',
              solution: ['V = πr²h.', 'V ≈ 3.14 × 3² × 10.', 'V ≈ 3.14 × 9 × 10.', 'V ≈ 282.6 cm³.'],
            },
          },
          {
            id: 'coordinate-plane',
            title: 'The Coordinate Plane',
            summary: 'Plotting points and finding midpoints and distances.',
            explanation:
              'The coordinate plane uses two perpendicular number lines (x-axis and y-axis) to locate points as ordered pairs (x, y). Distances and midpoints between points can be calculated using their coordinates.',
            keyPoints: [
              'An ordered pair (x, y) gives the horizontal (x) then vertical (y) position.',
              'Midpoint formula: ((x1+x2)/2, (y1+y2)/2).',
              'Distance formula: the square root of (x2-x1)² + (y2-y1)².',
            ],
            example: {
              problem: 'Find the midpoint of (2, 3) and (8, 7).',
              solution: ['Midpoint x: (2 + 8)/2 = 5.', 'Midpoint y: (3 + 7)/2 = 5.', 'The midpoint is (5, 5).'],
            },
          },
        ],
      },
    ],
  },
  {
    id: 'high-school',
    title: 'High School',
    courses: [
      {
        id: 'algebra-1',
        title: 'Algebra I',
        description: 'Linear equations, inequalities, systems, and graphing.',
        icon: 'school',
        lessons: [
          {
            id: 'linear-equations',
            title: 'Linear Equations',
            summary: 'Isolating the variable using inverse operations.',
            explanation:
              'A linear equation involves variables raised only to the first power. Solving typically means isolating the variable using inverse operations while keeping both sides balanced.',
            keyPoints: [
              'Combine like terms on each side first.',
              'Use addition or subtraction to move variable terms to one side, constants to the other.',
              'Divide by the coefficient of the variable last.',
            ],
            example: {
              problem: 'Solve 3x - 7 = 2x + 5.',
              solution: ['Subtract 2x from both sides: x - 7 = 5.', 'Add 7 to both sides: x = 12.'],
            },
          },
          {
            id: 'linear-inequalities',
            title: 'Linear Inequalities',
            summary: 'Solving inequalities and flipping the sign when needed.',
            explanation:
              "Inequalities compare expressions using <, >, ≤, or ≥. They're solved like equations, except the inequality sign flips when multiplying or dividing by a negative number.",
            keyPoints: [
              'Flip the inequality sign when multiplying or dividing both sides by a negative number.',
              'Solutions are often a range of values, shown on a number line.',
              "An open circle means the endpoint is excluded; a closed circle means it's included.",
            ],
            example: {
              problem: 'Solve -2x + 3 > 11.',
              solution: ['Subtract 3: -2x > 8.', 'Divide by -2 and flip the inequality: x < -4.'],
            },
          },
          {
            id: 'systems-of-equations',
            title: 'Systems of Equations',
            summary: 'Solving two equations at once with substitution or elimination.',
            explanation:
              'A system of equations is a set of equations with the same variables. Solving means finding the values that satisfy all equations at once, often using substitution or elimination.',
            keyPoints: [
              'Substitution: solve one equation for a variable, then substitute into the other.',
              'Elimination: add or subtract equations to cancel out one variable.',
              'A solution is a point (x, y) that satisfies both equations.',
            ],
            example: {
              problem: 'Solve the system: x + y = 10 and x - y = 2.',
              solution: [
                'Add the equations: (x + y) + (x - y) = 10 + 2.',
                '2x = 12, so x = 6.',
                'Substitute into x + y = 10: 6 + y = 10, so y = 4.',
                'Solution: (6, 4).',
              ],
            },
          },
          {
            id: 'graphing-linear-functions',
            title: 'Graphing Linear Functions',
            summary: 'Slope and y-intercept in slope-intercept form.',
            explanation:
              "A linear function's graph is a straight line, described by slope-intercept form y = mx + b, where m is the slope and b is the y-intercept.",
            keyPoints: [
              'Slope m = rise/run = (y2 - y1)/(x2 - x1).',
              'The y-intercept b is where the line crosses the y-axis (x = 0).',
              'Positive slope rises left to right; negative slope falls left to right.',
            ],
            example: {
              problem: 'Find the slope of the line through (1, 2) and (4, 11).',
              solution: ['m = (y2 - y1)/(x2 - x1).', 'm = (11 - 2)/(4 - 1) = 9/3.', 'm = 3.'],
            },
          },
        ],
      },
      {
        id: 'algebra-2',
        title: 'Algebra II',
        description: 'Quadratics, polynomials, exponential/log functions, and rational expressions.',
        icon: 'layers',
        lessons: [
          {
            id: 'quadratic-equations',
            title: 'Quadratic Equations',
            summary: 'Solving ax² + bx + c = 0 by factoring or the quadratic formula.',
            explanation:
              'A quadratic equation has the form ax² + bx + c = 0. It can be solved by factoring, completing the square, or using the quadratic formula.',
            keyPoints: [
              'Quadratic formula: x = (-b ± the square root of (b² - 4ac)) / (2a).',
              'The discriminant (b² - 4ac) tells you how many real solutions exist.',
              'A quadratic equation has at most two real solutions.',
            ],
            example: {
              problem: 'Solve x² - 5x + 6 = 0.',
              solution: [
                'Factor: (x - 2)(x - 3) = 0.',
                'Set each factor to zero: x - 2 = 0 or x - 3 = 0.',
                'x = 2 or x = 3.',
              ],
            },
          },
          {
            id: 'polynomials-factoring',
            title: 'Polynomials & Factoring',
            summary: 'Rewriting polynomials as products of simpler expressions.',
            explanation:
              'A polynomial is a sum of terms with non-negative integer exponents. Factoring rewrites a polynomial as a product of simpler expressions, which is useful for solving equations and simplifying expressions.',
            keyPoints: [
              'Always look for a greatest common factor (GCF) first.',
              'Difference of squares: a² - b² = (a - b)(a + b).',
              'For trinomials x² + bx + c, look for two numbers that multiply to c and add to b.',
            ],
            example: {
              problem: 'Factor x² - 9.',
              solution: [
                'Recognize this as a difference of squares: x² - 3².',
                'Apply a² - b² = (a - b)(a + b).',
                'x² - 9 = (x - 3)(x + 3).',
              ],
            },
          },
          {
            id: 'exponential-logarithmic-functions',
            title: 'Exponential & Logarithmic Functions',
            summary: 'Modeling growth and decay, and undoing exponents with logs.',
            explanation:
              'Exponential functions have the form y = a times b to the x, and model growth or decay. Logarithms are the inverse of exponentials: log base b of y equals x means b to the x equals y.',
            keyPoints: [
              'In y = a·b^x, b > 1 means growth, 0 < b < 1 means decay.',
              'log_b(y) = x is equivalent to b^x = y.',
              'Log rules: log(mn) = log m + log n, and log(m/n) = log m - log n.',
            ],
            example: {
              problem: 'Solve log base 2 of x = 5.',
              solution: ['Rewrite in exponential form: x = 2^5.', 'x = 32.'],
            },
          },
          {
            id: 'rational-expressions',
            title: 'Rational Expressions',
            summary: 'Simplifying fractions made of polynomials.',
            explanation:
              'A rational expression is a fraction where the numerator and/or denominator are polynomials. Simplify by factoring and canceling common factors, keeping track of values that would make the denominator zero.',
            keyPoints: [
              'Factor numerator and denominator fully before canceling.',
              'A rational expression is undefined wherever its denominator equals zero.',
              'To add or subtract rational expressions, find a common denominator just like with fractions.',
            ],
            example: {
              problem: 'Simplify (x² - 4)/(x + 2).',
              solution: [
                'Factor the numerator: x² - 4 = (x - 2)(x + 2).',
                'Rewrite: (x - 2)(x + 2) / (x + 2).',
                'Cancel the common factor (x + 2): x - 2, for x ≠ -2.',
              ],
            },
          },
        ],
      },
      {
        id: 'geometry-hs',
        title: 'Geometry',
        description: 'Congruence, similarity, the Pythagorean theorem, circles, and 3D solids.',
        icon: 'shapes',
        lessons: [
          {
            id: 'triangle-congruence-similarity',
            title: 'Triangle Congruence & Similarity',
            summary: 'Shortcuts like SSS, SAS, and AA for comparing triangles.',
            explanation:
              "Two triangles are congruent if they're identical in shape and size, and similar if they're the same shape but possibly different sizes. Specific rules (SSS, SAS, ASA, AA) let you prove congruence or similarity without checking every angle and side.",
            keyPoints: [
              'Congruence shortcuts: SSS, SAS, ASA, AAS.',
              'Similarity shortcut: AA (two pairs of equal angles guarantee similarity).',
              'Corresponding parts of congruent triangles are equal (CPCTC).',
            ],
            example: {
              problem:
                'Two triangles have angles 50° and 60°. A third triangle also has angles 50° and 60°. Are the first and third triangles similar?',
              solution: [
                'Both triangles share two pairs of equal angles (50° and 60°).',
                'By the AA similarity postulate, this is enough to guarantee similarity.',
                'Yes, the triangles are similar.',
              ],
            },
          },
          {
            id: 'pythagorean-theorem',
            title: 'The Pythagorean Theorem',
            summary: 'Finding a missing side of a right triangle.',
            explanation:
              'In a right triangle, the square of the hypotenuse equals the sum of the squares of the other two sides: a² + b² = c². This lets you find a missing side length when you know the other two.',
            keyPoints: [
              'The theorem only applies to right triangles.',
              'c is always the hypotenuse, the side opposite the right angle.',
              'It can also be used to check whether a triangle is a right triangle.',
            ],
            example: {
              problem: 'A right triangle has legs of 6 and 8. Find the hypotenuse.',
              solution: ['a² + b² = c².', '6² + 8² = c².', '36 + 64 = 100 = c².', 'c = the square root of 100 = 10.'],
            },
          },
          {
            id: 'circles',
            title: 'Circles',
            summary: 'Radius, diameter, circumference, and arcs.',
            explanation:
              'A circle is the set of all points equidistant from a center point. Key measurements include the radius, diameter, circumference, and arcs, which relate to central angles.',
            keyPoints: [
              'Diameter = 2 × radius.',
              'Circumference: C = 2πr = πd.',
              "An arc's measure in degrees equals its central angle's measure.",
            ],
            example: {
              problem: 'A circle has a radius of 5 cm. Find its circumference (use π ≈ 3.14).',
              solution: ['C = 2πr.', 'C ≈ 2 × 3.14 × 5.', 'C ≈ 31.4 cm.'],
            },
          },
          {
            id: 'area-volume-3d-solids',
            title: 'Area & Volume of 3D Solids',
            summary: 'Volume formulas for cones, spheres, and prisms.',
            explanation:
              'Three-dimensional solids like prisms, cylinders, cones, and spheres each have their own volume formulas based on their base shape and height or radius.',
            keyPoints: [
              'Cone volume: V = one-third × πr²h.',
              'Sphere volume: V = four-thirds × πr³.',
              'Prism volume: V = (area of base) × height.',
            ],
            example: {
              problem: 'Find the volume of a sphere with radius 3 cm (use π ≈ 3.14).',
              solution: ['V = four-thirds × πr³.', 'V ≈ 1.333 × 3.14 × 27.', 'V ≈ 113.04 cm³.'],
            },
          },
        ],
      },
      {
        id: 'trigonometry',
        title: 'Trigonometry',
        description: 'Right-triangle trig, the unit circle, graphs, and identities.',
        icon: 'triangle',
        lessons: [
          {
            id: 'right-triangle-trig',
            title: 'Right Triangle Trig (SOH-CAH-TOA)',
            summary: 'Sine, cosine, and tangent as ratios of sides.',
            explanation:
              "In a right triangle, the trigonometric ratios sine, cosine, and tangent relate an acute angle to the ratios of the triangle's sides, remembered with SOH-CAH-TOA.",
            keyPoints: [
              'SOH: sin(θ) = opposite/hypotenuse.',
              'CAH: cos(θ) = adjacent/hypotenuse.',
              'TOA: tan(θ) = opposite/adjacent.',
            ],
            example: {
              problem: 'A right triangle has an opposite side of 3 and a hypotenuse of 5 for angle θ. Find sin(θ).',
              solution: ['sin(θ) = opposite/hypotenuse.', 'sin(θ) = 3/5.', 'sin(θ) = 0.6.'],
            },
          },
          {
            id: 'unit-circle',
            title: 'The Unit Circle',
            summary: 'Defining sine and cosine for any angle.',
            explanation:
              'The unit circle is a circle of radius 1 centered at the origin, used to define sine and cosine for any angle, not just those in right triangles. A point on the unit circle at angle θ has coordinates (cos θ, sin θ).',
            keyPoints: [
              'The unit circle has radius 1, centered at (0, 0).',
              'For angle θ, the point on the circle is (cos θ, sin θ).',
              'Key angles: 0°, 30°, 45°, 60°, 90° have memorable exact sine and cosine values.',
            ],
            example: {
              problem: 'Find cos(90°) using the unit circle.',
              solution: [
                'At 90°, the point on the unit circle is (0, 1).',
                'The x-coordinate gives cos(90°).',
                'cos(90°) = 0.',
              ],
            },
          },
          {
            id: 'graphing-sine-cosine',
            title: 'Graphing Sine & Cosine',
            summary: 'Amplitude and period of trig function graphs.',
            explanation:
              "The graphs of y = sin(x) and y = cos(x) are smooth waves that repeat every 360° (2π radians). Changing the equation's coefficients stretches, compresses, or shifts the wave.",
            keyPoints: [
              'Both sine and cosine have a period of 360° and range from -1 to 1.',
              'In y = A sin(x), A is the amplitude, the height of the wave from the midline.',
              'sin(x) starts at 0; cos(x) starts at its maximum, 1.',
            ],
            example: {
              problem: 'What is the amplitude of y = 4 sin(x)?',
              solution: ['In y = A sin(x), A gives the amplitude.', 'Here A = 4.', 'The amplitude is 4.'],
            },
          },
          {
            id: 'trig-identities',
            title: 'Trig Identities',
            summary: 'Using the Pythagorean identity to relate sine and cosine.',
            explanation:
              'Trigonometric identities are equations involving trig functions that are true for all valid angles, used to simplify expressions and solve equations.',
            keyPoints: [
              'Pythagorean identity: sin²(θ) + cos²(θ) = 1.',
              'tan(θ) = sin(θ)/cos(θ).',
              'Identities let you rewrite an expression in a more useful equivalent form.',
            ],
            example: {
              problem: 'If sin(θ) = 0.6, find cos(θ) using the Pythagorean identity (assume θ is acute).',
              solution: [
                'sin²(θ) + cos²(θ) = 1.',
                '0.6² + cos²(θ) = 1.',
                '0.36 + cos²(θ) = 1, so cos²(θ) = 0.64.',
                'cos(θ) = the square root of 0.64 = 0.8.',
              ],
            },
          },
        ],
      },
      {
        id: 'precalculus',
        title: 'Pre-Calculus',
        description: 'Function transformations, polynomials, and sequences.',
        icon: 'trending-up',
        lessons: [
          {
            id: 'functions-transformations',
            title: 'Functions & Transformations',
            summary: 'Shifting, stretching, and reflecting graphs.',
            explanation:
              "A function assigns exactly one output to each input. Transformations shift, stretch, compress, or reflect a function's graph without changing its basic shape.",
            keyPoints: [
              'f(x) + k shifts the graph up (k > 0) or down (k < 0).',
              'f(x + h) shifts the graph left (h > 0) or right (h < 0).',
              '-f(x) reflects the graph over the x-axis.',
            ],
            example: {
              problem: 'How does the graph of y = (x - 3)² + 2 relate to y = x²?',
              solution: [
                'The (x - 3) shifts the graph right 3 units.',
                'The + 2 shifts the graph up 2 units.',
                "It's the graph of y = x² shifted right 3 and up 2.",
              ],
            },
          },
          {
            id: 'polynomial-rational-functions',
            title: 'Polynomial & Rational Functions',
            summary: 'End behavior and asymptotes.',
            explanation:
              "Polynomial functions are built from terms with non-negative integer exponents; their end behavior depends on the degree and leading coefficient. Rational functions are ratios of polynomials and can have asymptotes.",
            keyPoints: [
              "A polynomial's degree (highest exponent) determines its end behavior.",
              "A vertical asymptote occurs where a rational function's denominator equals zero (and the numerator doesn't).",
              "A horizontal asymptote describes the function's behavior as x approaches positive or negative infinity.",
            ],
            example: {
              problem: 'Find the vertical asymptote of f(x) = 1/(x - 4).',
              solution: ['Set the denominator equal to zero: x - 4 = 0.', 'x = 4.', 'The vertical asymptote is x = 4.'],
            },
          },
          {
            id: 'exponential-log-review',
            title: 'Exponential & Log Functions Review',
            summary: 'Growth rates and solving exponential equations.',
            explanation:
              'Building on earlier exponential and logarithmic concepts, pre-calculus explores their graphs, growth rates, and how to solve more complex equations involving them.',
            keyPoints: [
              'Exponential functions grow or decay faster than any polynomial over time.',
              'The natural logarithm ln(x) uses base e, approximately 2.718.',
              'To solve for a variable in an exponent, take the logarithm of both sides.',
            ],
            example: {
              problem: 'Solve 3^x = 81.',
              solution: ['Rewrite 81 as a power of 3: 81 = 3^4.', 'So 3^x = 3^4.', 'Since the bases match, x = 4.'],
            },
          },
          {
            id: 'sequences-series',
            title: 'Sequences & Series',
            summary: 'Arithmetic and geometric patterns of numbers.',
            explanation:
              "A sequence is an ordered list of numbers following a pattern; a series is the sum of a sequence's terms. Arithmetic sequences have a constant difference, while geometric sequences have a constant ratio.",
            keyPoints: [
              'Arithmetic sequence: a_n = a_1 + (n - 1)d, where d is the common difference.',
              'Geometric sequence: a_n = a_1 × r^(n-1), where r is the common ratio.',
              'Sum of a finite arithmetic series: S_n = n(a_1 + a_n)/2.',
            ],
            example: {
              problem: 'Find the 5th term of the arithmetic sequence 3, 7, 11, 15, ...',
              solution: [
                'First term a_1 = 3, common difference d = 4.',
                'a_5 = a_1 + (5 - 1)d = 3 + 4(4).',
                'a_5 = 3 + 16 = 19.',
              ],
            },
          },
        ],
      },
      {
        id: 'statistics',
        title: 'Statistics & Probability',
        description: 'Descriptive statistics, probability, counting, and distributions.',
        icon: 'stats-chart',
        lessons: [
          {
            id: 'descriptive-statistics',
            title: 'Descriptive Statistics',
            summary: 'Mean, median, mode, and range.',
            explanation:
              'Descriptive statistics summarize a data set using measures like mean, median, mode, and range, which describe its center and spread.',
            keyPoints: [
              'Mean = sum of all values ÷ number of values.',
              'Median = the middle value when data is sorted (average of two middles if even count).',
              'Range = maximum value - minimum value.',
            ],
            example: {
              problem: 'Find the mean of 4, 8, 6, 10, 2.',
              solution: ['Sum the values: 4 + 8 + 6 + 10 + 2 = 30.', 'Divide by the count (5): 30 ÷ 5 = 6.', 'The mean is 6.'],
            },
          },
          {
            id: 'probability-basics',
            title: 'Probability Basics',
            summary: 'How likely an event is, as a fraction of outcomes.',
            explanation:
              'Probability measures how likely an event is to happen, expressed as a number between 0 (impossible) and 1 (certain), often written as a fraction.',
            keyPoints: [
              'P(event) = (favorable outcomes) ÷ (total possible outcomes).',
              'Probabilities range from 0 to 1 (or 0% to 100%).',
              'For independent events, P(A and B) = P(A) × P(B).',
            ],
            example: {
              problem: 'A bag has 4 red and 6 blue marbles. Find the probability of drawing a red marble.',
              solution: ['Total marbles = 4 + 6 = 10.', 'Favorable outcomes (red) = 4.', 'P(red) = 4/10 = 2/5.'],
            },
          },
          {
            id: 'combinations-permutations',
            title: 'Combinations & Permutations',
            summary: "Counting arrangements where order does or doesn't matter.",
            explanation:
              "Permutations count arrangements where order matters; combinations count selections where order doesn't matter.",
            keyPoints: [
              'Permutations of n items taken r at a time: P(n, r) = n! / (n - r)!.',
              'Combinations of n items taken r at a time: C(n, r) = n! / (r!(n - r)!).',
              'n! (n factorial) means n × (n-1) × ... × 1.',
            ],
            example: {
              problem: "How many ways can you choose 2 students from a group of 5 (order doesn't matter)?",
              solution: [
                'Use combinations: C(n, r) = n! / (r!(n - r)!).',
                'C(5, 2) = 5! / (2! × 3!) = 120 / (2 × 6).',
                'C(5, 2) = 120/12 = 10.',
              ],
            },
          },
          {
            id: 'normal-distribution',
            title: 'Normal Distribution',
            summary: 'The bell curve, standard deviation, and z-scores.',
            explanation:
              'The normal distribution is a symmetric, bell-shaped distribution common in nature and statistics, described by its mean and standard deviation.',
            keyPoints: [
              'About 68% of data falls within 1 standard deviation of the mean.',
              'About 95% falls within 2 standard deviations; about 99.7% within 3 (the empirical rule).',
              'A z-score tells you how many standard deviations a value is from the mean.',
            ],
            example: {
              problem: 'A data set has mean 50 and standard deviation 5. Find the z-score for a value of 60.',
              solution: ['z = (value - mean) / standard deviation.', 'z = (60 - 50) / 5.', 'z = 10/5 = 2.'],
            },
          },
        ],
      },
    ],
  },
  {
    id: 'college',
    title: 'College',
    courses: [
      {
        id: 'calculus-1',
        title: 'Calculus I',
        description: 'Limits, derivatives, and an introduction to integrals.',
        icon: 'infinite',
        lessons: [
          {
            id: 'limits-continuity',
            title: 'Limits & Continuity',
            summary: 'What a function approaches, and where graphs have no breaks.',
            explanation:
              "A limit describes the value a function approaches as the input gets close to a certain point, even if the function isn't defined exactly there. A function is continuous where its graph has no breaks or jumps.",
            keyPoints: [
              'The limit as x approaches a of f(x) equals L means f(x) gets arbitrarily close to L as x approaches a.',
              'A function is continuous at a if the limit exists there and equals f(a).',
              'Many limits can be found by direct substitution if the function is continuous there.',
            ],
            example: {
              problem: 'Find the limit as x approaches 3 of (x² + 2x).',
              solution: [
                'Since x² + 2x is continuous everywhere, substitute x = 3 directly.',
                '3² + 2(3) = 9 + 6.',
                'The limit is 15.',
              ],
            },
          },
          {
            id: 'derivatives-differentiation-rules',
            title: 'Derivatives & Differentiation Rules',
            summary: 'The power rule and finding rates of change.',
            explanation:
              "The derivative of a function measures its instantaneous rate of change, or the slope of its tangent line at a point. Rules like the power rule make finding derivatives of common functions straightforward.",
            keyPoints: [
              'Power rule: the derivative of x^n is n times x^(n-1).',
              'The derivative of a constant is 0.',
              'Sum rule: the derivative of a sum is the sum of the derivatives.',
            ],
            example: {
              problem: 'Find the derivative of f(x) = 3x⁴ - 2x + 5.',
              solution: [
                'Differentiate each term using the power rule.',
                'The derivative of 3x⁴ is 12x³.',
                'The derivative of -2x is -2, and the derivative of 5 is 0.',
                "f'(x) = 12x³ - 2.",
              ],
            },
          },
          {
            id: 'applications-of-derivatives',
            title: 'Applications of Derivatives',
            summary: 'Finding increasing/decreasing intervals and critical points.',
            explanation:
              'Derivatives have practical uses, like finding where a function is increasing or decreasing, locating maximum and minimum points, and modeling rates of change in real situations.',
            keyPoints: [
              "A function is increasing where f'(x) > 0 and decreasing where f'(x) < 0.",
              "Critical points occur where f'(x) = 0 or is undefined; these may be local max or min points.",
              'Related rates problems use derivatives to relate how different quantities change over time.',
            ],
            example: {
              problem: 'Find the critical point(s) of f(x) = x² - 4x.',
              solution: ["Find the derivative: f'(x) = 2x - 4.", 'Set it to zero: 2x - 4 = 0.', 'x = 2 is the critical point.'],
            },
          },
          {
            id: 'intro-to-integrals',
            title: 'Introduction to Integrals',
            summary: 'Reversing differentiation to find area and accumulation.',
            explanation:
              'Integration is the reverse process of differentiation, used to find a function from its rate of change, and to calculate areas under curves.',
            keyPoints: [
              'The indefinite integral of x^n is x^(n+1)/(n+1) + C, for n not equal to -1.',
              'The constant C accounts for the fact that many functions share the same derivative.',
              'A definite integral computes the net area between a curve and the x-axis over an interval.',
            ],
            example: {
              problem: 'Find the indefinite integral of f(x) = 6x².',
              solution: [
                'Apply the power rule for integration: the integral of x^n is x^(n+1)/(n+1).',
                'The integral of 6x² is 6 times x³/3.',
                '= 2x³ + C.',
              ],
            },
          },
        ],
      },
      {
        id: 'calculus-2',
        title: 'Calculus II',
        description: 'Integration techniques, applications, and series.',
        icon: 'analytics',
        lessons: [
          {
            id: 'integration-techniques',
            title: 'Integration Techniques',
            summary: 'Substitution and integration by parts.',
            explanation:
              'Beyond basic power-rule integration, techniques like substitution and integration by parts help evaluate more complex integrals.',
            keyPoints: [
              'U-substitution reverses the chain rule: let u equal part of the integrand, then rewrite in terms of u.',
              'Integration by parts: the integral of u dv equals uv minus the integral of v du.',
              'Choosing the right technique depends on the structure of the integrand.',
            ],
            example: {
              problem: 'Use substitution to find the integral of 2x(x² + 1)³ dx.',
              solution: [
                'Let u = x² + 1, so du = 2x dx.',
                'Rewrite the integral: the integral of u³ du.',
                'Integrate: u⁴/4 + C.',
                'Substitute back: (x² + 1)⁴/4 + C.',
              ],
            },
          },
          {
            id: 'applications-of-integrals',
            title: 'Applications of Integrals',
            summary: 'Area between curves and volumes of revolution.',
            explanation:
              'Definite integrals can compute areas between curves, volumes of solids of revolution, and other accumulated quantities.',
            keyPoints: [
              'Area between two curves f(x) and g(x) from a to b: integrate (f(x) - g(x)) dx over [a, b].',
              'Volume by disks: V = π times the integral of [f(x)]² dx, when rotating around the x-axis.',
              'Setting up the correct bounds and integrand is often the hardest part.',
            ],
            example: {
              problem: 'Set up (without evaluating) the integral for the area between y = x + 2 and y = x² from x = 0 to x = 1.',
              solution: [
                'The area between two curves is the integral of (top function - bottom function) dx.',
                'Here, x + 2 is above x² on this interval.',
                'Area = the integral from 0 to 1 of ((x + 2) - x²) dx.',
              ],
            },
          },
          {
            id: 'sequences-series-calc2',
            title: 'Sequences & Series',
            summary: 'Convergence of infinite sums.',
            explanation:
              'In calculus, sequences and series are studied for convergence: whether their terms or partial sums approach a finite limit as n grows large.',
            keyPoints: [
              'A series converges if its sequence of partial sums approaches a finite limit.',
              'A geometric series with ratio r converges when the absolute value of r is less than 1, to the sum a/(1 - r).',
              "The nth-term test: if the terms don't approach 0, the series diverges.",
            ],
            example: {
              problem: 'Does the geometric series 1 + 1/2 + 1/4 + 1/8 + ... converge, and if so, to what?',
              solution: [
                'This is geometric with a = 1 and r = 1/2.',
                'Since the absolute value of r is less than 1, the series converges.',
                'Sum = a/(1 - r) = 1/(1 - 0.5) = 2.',
              ],
            },
          },
          {
            id: 'power-series-taylor-series',
            title: 'Power Series & Taylor Series',
            summary: 'Approximating functions with polynomials.',
            explanation:
              "A power series is an infinite sum of terms involving powers of x; a Taylor series uses a function's derivatives at a point to build a power series that approximates the function near that point.",
            keyPoints: [
              'A Taylor series centered at a sums terms of the form f^(n)(a)/n! times (x - a)^n.',
              'A Maclaurin series is a Taylor series centered at a = 0.',
              'Taylor series let you approximate functions like sin(x) or e^x with polynomials.',
            ],
            example: {
              problem: 'Write the first two nonzero terms of the Maclaurin series for e^x.',
              solution: [
                'The Maclaurin series for e^x is 1 + x + x²/2! + ...',
                'The first two nonzero terms are 1 and x.',
              ],
            },
          },
        ],
      },
      {
        id: 'linear-algebra',
        title: 'Linear Algebra',
        description: 'Vectors, matrices, systems, determinants, and eigenvalues.',
        icon: 'grid',
        lessons: [
          {
            id: 'vectors-vector-spaces',
            title: 'Vectors & Vector Spaces',
            summary: 'Magnitude, addition, and scaling of vectors.',
            explanation:
              'A vector is a quantity with both magnitude and direction, often represented as an ordered list of numbers. Vector spaces are collections of vectors that can be added together and scaled while staying within the space.',
            keyPoints: [
              'Vectors can be added component-wise and scaled by multiplying each component.',
              'The magnitude (length) of a vector (a, b) is the square root of a² + b².',
              'A vector space must be closed under addition and scalar multiplication.',
            ],
            example: {
              problem: 'Find the magnitude of the vector (3, 4).',
              solution: ['Magnitude = the square root of a² + b².', '= the square root of (3² + 4²) = the square root of 25.', '= 5.'],
            },
          },
          {
            id: 'matrices-matrix-operations',
            title: 'Matrices & Matrix Operations',
            summary: 'Adding, subtracting, and multiplying matrices.',
            explanation:
              "A matrix is a rectangular array of numbers. Matrices can be added, subtracted, and multiplied following specific rules, and they're used to represent systems of equations and transformations.",
            keyPoints: [
              'Matrices can only be added or subtracted if they have the same dimensions.',
              'To multiply matrices, the number of columns in the first must equal the number of rows in the second.',
              'Matrix multiplication is generally not commutative: AB does not usually equal BA.',
            ],
            example: {
              problem: 'Add the matrices [[1,2],[3,4]] and [[5,6],[7,8]].',
              solution: [
                'Add corresponding entries.',
                'Top row: 1+5=6, 2+6=8.',
                'Bottom row: 3+7=10, 4+8=12.',
                'Result: [[6,8],[10,12]].',
              ],
            },
          },
          {
            id: 'systems-linear-equations-matrices',
            title: 'Systems of Linear Equations',
            summary: 'Writing systems as augmented matrices.',
            explanation:
              'Systems of linear equations can be written and solved using matrices, often through row reduction (Gaussian elimination) to simplify the system to an easily solvable form.',
            keyPoints: [
              'A system can be written as an augmented matrix combining coefficients and constants.',
              "Row operations (swap, scale, add rows) don't change a system's solution.",
              'Row-reduce to row-echelon form to read off the solution directly.',
            ],
            example: {
              problem: 'Write the system x + 2y = 5 and 3x - y = 1 as an augmented matrix.',
              solution: [
                'Coefficients of x and y form the matrix part, constants form the last column.',
                'Row 1: 1, 2, | 5.',
                'Row 2: 3, -1, | 1.',
                'Augmented matrix: [[1, 2, 5], [3, -1, 1]].',
              ],
            },
          },
          {
            id: 'determinants-eigenvalues',
            title: 'Determinants & Eigenvalues',
            summary: 'A single number that reveals invertibility, and special stretch factors.',
            explanation:
              'The determinant is a single number computed from a square matrix that reveals properties like invertibility. Eigenvalues are special scalars associated with a matrix that describe how it stretches space along certain directions (eigenvectors).',
            keyPoints: [
              'For a 2x2 matrix [[a,b],[c,d]], the determinant is ad - bc.',
              'A matrix is invertible exactly when its determinant is nonzero.',
              'Eigenvalues λ satisfy det(A - λI) = 0.',
            ],
            example: {
              problem: 'Find the determinant of [[4, 2], [3, 1]].',
              solution: ['det = ad - bc.', '= (4)(1) - (2)(3).', '= 4 - 6 = -2.'],
            },
          },
        ],
      },
      {
        id: 'differential-equations',
        title: 'Differential Equations',
        description: 'First- and second-order ODEs, systems, and Laplace transforms.',
        icon: 'pulse',
        lessons: [
          {
            id: 'first-order-odes',
            title: 'First-Order ODEs',
            summary: 'Solving separable differential equations.',
            explanation:
              'A first-order ordinary differential equation (ODE) relates a function to its first derivative. Separable equations can be solved by rearranging so each variable appears on only one side, then integrating both sides.',
            keyPoints: [
              'A separable ODE can be written as g(y) dy = f(x) dx.',
              'Solve by integrating both sides separately.',
              'An initial condition lets you solve for the constant of integration.',
            ],
            example: {
              problem: 'Solve dy/dx = 2x, given y(0) = 3.',
              solution: [
                'Separate and integrate: the integral of dy equals the integral of 2x dx.',
                'y = x² + C.',
                'Use y(0) = 3: 3 = 0² + C, so C = 3.',
                'y = x² + 3.',
              ],
            },
          },
          {
            id: 'second-order-linear-odes',
            title: 'Second-Order Linear ODEs',
            summary: 'Using the characteristic equation to find solutions.',
            explanation:
              "A second-order linear ODE involves a function and its first and second derivatives. For constant-coefficient equations, solutions often take the form of exponential functions, found via a characteristic equation.",
            keyPoints: [
              "For ay'' + by' + cy = 0, the characteristic equation is ar² + br + c = 0.",
              'Real distinct roots r1, r2 give a general solution combining two exponential terms.',
              'Complex or repeated roots lead to sine/cosine or extra factors of x in the solution.',
            ],
            example: {
              problem: "Find the characteristic equation of y'' - 5y' + 6y = 0.",
              solution: [
                "Replace y'' with r², y' with r, and y with 1.",
                'r² - 5r + 6 = 0.',
                'This factors as (r - 2)(r - 3) = 0, giving roots r = 2 and r = 3.',
              ],
            },
          },
          {
            id: 'systems-of-odes',
            title: 'Systems of ODEs',
            summary: 'Multiple interrelated differential equations in matrix form.',
            explanation:
              'A system of ODEs involves multiple interrelated functions and their derivatives, often written in matrix form, and used to model systems like coupled populations or circuits.',
            keyPoints: [
              "A linear system can be written as x' = Ax, where A is a matrix of coefficients.",
              'Solutions often involve the eigenvalues and eigenvectors of A.',
              'Systems of ODEs model situations where multiple quantities change together over time.',
            ],
            example: {
              problem: "Write x' = 3x + y and y' = x - 2y as a matrix equation x' = Ax.",
              solution: [
                'Collect coefficients of x and y from each equation into a matrix.',
                "Row 1 (x'): 3, 1.",
                "Row 2 (y'): 1, -2.",
                'A = [[3, 1], [1, -2]].',
              ],
            },
          },
          {
            id: 'laplace-transforms',
            title: 'Laplace Transforms',
            summary: 'Turning derivatives into algebra.',
            explanation:
              'The Laplace transform converts a differential equation in time into an algebraic equation in a new variable s, making many ODEs easier to solve, especially with initial conditions.',
            keyPoints: [
              'The Laplace transform of f(t) integrates e^(-st) f(t) from 0 to infinity.',
              "The transform of f'(t) is s times F(s) minus f(0), which turns derivatives into algebra.",
              'After solving algebraically for F(s), an inverse transform gives f(t) back.',
            ],
            example: {
              problem: 'State the Laplace transform of f(t) = 1 (the constant function).',
              solution: [
                'The transform integrates e^(-st) from 0 to infinity.',
                'This evaluates to 1/s for s > 0.',
                'The Laplace transform of 1 is 1/s.',
              ],
            },
          },
        ],
      },
      {
        id: 'discrete-math',
        title: 'Discrete Mathematics',
        description: 'Logic, set theory, combinatorics, and graph theory.',
        icon: 'git-network',
        lessons: [
          {
            id: 'logic-proofs',
            title: 'Logic & Proofs',
            summary: 'Conditional statements and methods of proof.',
            explanation:
              'Logic studies statements that are either true or false, and how they combine using connectives like AND, OR, and NOT. Proofs use logical reasoning to establish that a mathematical statement must be true.',
            keyPoints: [
              'A conditional statement "if p then q" is false only when p is true and q is false.',
              'Direct proof: assume the hypothesis, then logically derive the conclusion.',
              'Proof by contradiction: assume the opposite of what you want to prove, and show it leads to a contradiction.',
            ],
            example: {
              problem: 'State the converse of "If it rains, the ground is wet."',
              solution: [
                'The converse swaps the hypothesis and conclusion.',
                'Original: If it rains, the ground is wet.',
                'Converse: If the ground is wet, it rains.',
              ],
            },
          },
          {
            id: 'set-theory',
            title: 'Set Theory',
            summary: 'Union, intersection, and subsets.',
            explanation:
              'A set is a collection of distinct objects. Set operations like union, intersection, and complement describe how sets relate to and combine with each other.',
            keyPoints: [
              'Union (A ∪ B): elements in A or B (or both).',
              'Intersection (A ∩ B): elements in both A and B.',
              'A is a subset of B if every element of A is also in B.',
            ],
            example: {
              problem: 'If A = {1, 2, 3} and B = {2, 3, 4}, find A ∩ B.',
              solution: ['The intersection contains elements in both sets.', '2 and 3 appear in both A and B.', 'A ∩ B = {2, 3}.'],
            },
          },
          {
            id: 'combinatorics',
            title: 'Combinatorics',
            summary: 'Counting principles beyond basic permutations.',
            explanation:
              'Combinatorics is the study of counting arrangements and selections, building on permutations and combinations to solve more general counting problems.',
            keyPoints: [
              'The addition principle: if two choices are mutually exclusive, add their counts.',
              'The multiplication principle: if choices are made in sequence, multiply the number of options at each step.',
              'The pigeonhole principle: if more items are placed into fewer containers than items, at least one container holds more than one item.',
            ],
            example: {
              problem: 'A café offers 3 drink sizes and 4 flavors. How many drink combinations are possible?',
              solution: [
                'Use the multiplication principle: multiply the number of choices at each step.',
                '3 sizes × 4 flavors = 12.',
                'There are 12 possible combinations.',
              ],
            },
          },
          {
            id: 'graph-theory-basics',
            title: 'Graph Theory Basics',
            summary: 'Vertices, edges, and degree.',
            explanation:
              'A graph is a set of vertices (points) connected by edges (lines). Graph theory studies properties like connectivity, paths, and cycles, and is used to model networks of all kinds.',
            keyPoints: [
              "A vertex's degree is the number of edges connected to it.",
              'A path is a sequence of edges connecting a sequence of distinct vertices.',
              "A graph is connected if there's a path between every pair of vertices.",
            ],
            example: {
              problem: 'In a graph, vertex A connects to B, C, and D. What is the degree of vertex A?',
              solution: [
                'Degree counts the number of edges touching the vertex.',
                'A connects to 3 other vertices: B, C, D.',
                'The degree of A is 3.',
              ],
            },
          },
        ],
      },
    ],
  },
];

export function findCourse(courseId: string): Course | undefined {
  for (const level of levels) {
    const course = level.courses.find((c) => c.id === courseId);
    if (course) return course;
  }
  return undefined;
}

export function findLessonById(lessonId: string): { course: Course; lesson: Lesson } | undefined {
  for (const level of levels) {
    for (const course of level.courses) {
      const lesson = course.lessons.find((l) => l.id === lessonId);
      if (lesson) return { course, lesson };
    }
  }
  return undefined;
}
