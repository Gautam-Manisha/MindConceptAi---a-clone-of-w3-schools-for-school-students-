export type ConceptNode = {
  id: string;
  title: string;
  description: string;
  mastery: 'mastered' | 'review' | 'weak';
  subject: string;
  relatedConcepts: string[];
  resources: {
    title: string;
    type: 'video' | 'article' | 'exercise';
    url: string;
  }[];
};

export type Question = {
  id: string;
  conceptId: string;
  text: string;
  type: 'multiple-choice' | 'short-answer' | 'drag-drop';
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
};

export type UserProgress = {
  points: number;
  conceptsMastered: number;
  streakDays: number;
  badges: Badge[];
};

export type Badge = {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  progress?: {
    current: number;
    required: number;
  };
};

export type LearningPath = {
  id: string;
  title: string;
  description: string;
  concepts: string[];
  progress: number;
};

export type User = {
  id: string;
  name: string;
  email: string;
  progress: UserProgress;
  learningPaths: LearningPath[];
};