import type { Ionicons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';

type IconName = ComponentProps<typeof Ionicons>['name'];

export const greetingName = 'Alex';

export type Stat = {
  id: string;
  icon: IconName;
  value: string;
  label: string;
};

export const stats: Stat[] = [
  { id: 'streak', icon: 'flame', value: '7', label: 'Day streak' },
  { id: 'solved', icon: 'checkmark-circle', value: '42', label: 'Solved' },
  { id: 'accuracy', icon: 'star', value: '88%', label: 'Accuracy' },
];

export type QuickAction = {
  id: string;
  icon: IconName;
  label: string;
};

export const quickActions: QuickAction[] = [
  { id: 'scan', icon: 'camera', label: 'Scan a Problem' },
  { id: 'type', icon: 'create', label: 'Type a Problem' },
  { id: 'quiz', icon: 'help-circle', label: 'Start a Quiz' },
];

export type RecentProblem = {
  id: string;
  snippet: string;
  subject: string;
  timeAgo: string;
};

export const recentProblems: RecentProblem[] = [
  { id: '1', snippet: '2x + 5 = 17', subject: 'Algebra', timeAgo: '2h ago' },
  { id: '2', snippet: 'Area of a circle, r = 4', subject: 'Geometry', timeAgo: '5h ago' },
  { id: '3', snippet: '∫ x² dx', subject: 'Calculus', timeAgo: '1d ago' },
  { id: '4', snippet: 'sin(θ) = 0.5, solve for θ', subject: 'Trigonometry', timeAgo: '2d ago' },
];
