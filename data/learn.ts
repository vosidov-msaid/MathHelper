import type { Ionicons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';

type IconName = ComponentProps<typeof Ionicons>['name'];

export type Topic = {
  id: string;
  title: string;
  description: string;
  progressPct: number;
  lessonCount: number;
  icon: IconName;
};

export const topics: Topic[] = [
  {
    id: 'algebra',
    title: 'Algebra Basics',
    description: 'Variables, equations, and expressions',
    progressPct: 72,
    lessonCount: 12,
    icon: 'calculator',
  },
  {
    id: 'geometry',
    title: 'Geometry Essentials',
    description: 'Shapes, angles, and area',
    progressPct: 45,
    lessonCount: 10,
    icon: 'shapes',
  },
  {
    id: 'trigonometry',
    title: 'Trigonometry',
    description: 'Sine, cosine, and tangent',
    progressPct: 10,
    lessonCount: 8,
    icon: 'triangle',
  },
  {
    id: 'calculus',
    title: 'Calculus I',
    description: 'Limits, derivatives, and integrals',
    progressPct: 0,
    lessonCount: 14,
    icon: 'infinite',
  },
  {
    id: 'statistics',
    title: 'Statistics',
    description: 'Mean, median, and probability',
    progressPct: 30,
    lessonCount: 9,
    icon: 'stats-chart',
  },
];
