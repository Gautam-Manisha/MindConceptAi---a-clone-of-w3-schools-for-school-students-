import { ConceptNode, Question, Badge, User, LearningPath } from '../types';

export const mockConcepts: ConceptNode[] = [
  {
    id: 'c1',
    title: 'Pythagorean Theorem',
    description: 'In a right-angled triangle, the square of the hypotenuse equals the sum of the squares of the other two sides: a² + b² = c²',
    mastery: 'mastered',
    subject: 'Mathematics',
    relatedConcepts: ['c2', 'c4', 'c7'],
    resources: [
      {
        title: 'Khan Academy: Pythagorean Theorem',
        type: 'video',
        url: 'https://www.khanacademy.org/math/geometry/hs-geo-trig/hs-geo-pythagorean-theorem/v/the-pythagorean-theorem'
      },
      {
        title: 'Interactive Pythagorean Theorem Exercise',
        type: 'exercise',
        url: '#'
      }
    ]
  },
  {
    id: 'c2',
    title: 'Trigonometric Functions',
    description: 'Functions of angles that relate to ratios of sides of a right triangle: sine, cosine, tangent',
    mastery: 'review',
    subject: 'Mathematics',
    relatedConcepts: ['c1', 'c3', 'c7'],
    resources: [
      {
        title: 'Trigonometric Functions Introduction',
        type: 'video',
        url: '#'
      }
    ]
  },
  {
    id: 'c3',
    title: 'Derivative Rules',
    description: 'Formulas and methods for finding the derivatives of functions in calculus',
    mastery: 'weak',
    subject: 'Mathematics',
    relatedConcepts: ['c2', 'c7'],
    resources: [
      {
        title: 'Calculus: Derivative Rules Explained',
        type: 'article',
        url: '#'
      }
    ]
  },
  {
    id: 'c4',
    title: 'Newton\'s Laws of Motion',
    description: 'Three physical laws that form the foundation for classical mechanics',
    mastery: 'review',
    subject: 'Physics',
    relatedConcepts: ['c5', 'c6'],
    resources: [
      {
        title: 'Understanding Newton\'s Three Laws',
        type: 'video',
        url: '#'
      }
    ]
  },
  {
    id: 'c5',
    title: 'Conservation of Energy',
    description: 'The principle that energy cannot be created or destroyed, only transformed',
    mastery: 'weak',
    subject: 'Physics',
    relatedConcepts: ['c4', 'c6'],
    resources: [
      {
        title: 'Conservation of Energy in Physical Systems',
        type: 'article',
        url: '#'
      }
    ]
  },
  {
    id: 'c6',
    title: 'Momentum and Collisions',
    description: 'The product of mass and velocity, and how it applies to collisions',
    mastery: 'weak',
    subject: 'Physics',
    relatedConcepts: ['c4', 'c5'],
    resources: [
      {
        title: 'Momentum in Physics',
        type: 'video',
        url: '#'
      }
    ]
  },
  {
    id: 'c7',
    title: 'Quadratic Functions',
    description: 'Functions of the form f(x) = ax² + bx + c where a ≠ 0',
    mastery: 'mastered',
    subject: 'Mathematics',
    relatedConcepts: ['c1', 'c2', 'c3'],
    resources: [
      {
        title: 'Quadratic Functions and Their Graphs',
        type: 'article',
        url: '#'
      }
    ]
  },
  {
    id: 'c8',
    title: 'Periodic Table',
    description: 'Tabular arrangement of chemical elements organized by atomic number, electron configuration, and chemical properties',
    mastery: 'review',
    subject: 'Chemistry',
    relatedConcepts: ['c9', 'c10'],
    resources: [
      {
        title: 'Interactive Periodic Table',
        type: 'exercise',
        url: '#'
      }
    ]
  },
  {
    id: 'c9',
    title: 'Chemical Bonding',
    description: 'The attraction between atoms that allows the formation of chemical substances containing two or more atoms',
    mastery: 'weak',
    subject: 'Chemistry',
    relatedConcepts: ['c8', 'c10'],
    resources: [
      {
        title: 'Types of Chemical Bonds',
        type: 'video',
        url: '#'
      }
    ]
  },
  {
    id: 'c10',
    title: 'Atomic Structure',
    description: 'The structure of an atom, consisting of a nucleus and electrons',
    mastery: 'review',
    subject: 'Chemistry',
    relatedConcepts: ['c8', 'c9'],
    resources: [
      {
        title: 'Understanding Atomic Structure',
        type: 'article',
        url: '#'
      }
    ]
  },
];

export const mockQuestions: Question[] = [
  {
    id: 'q1',
    conceptId: 'c1',
    text: 'In a right-angled triangle, if the two shorter sides are 3 and 4 units, what is the length of the hypotenuse?',
    type: 'multiple-choice',
    options: ['5 units', '7 units', '25 units', 'None of the above'],
    correctAnswer: '5 units',
    explanation: 'Using the Pythagorean theorem: a² + b² = c². So, 3² + 4² = c². That\'s 9 + 16 = 25, so c = 5.',
    difficulty: 'easy'
  },
  {
    id: 'q2',
    conceptId: 'c2',
    text: 'What is the value of sin(30°)?',
    type: 'multiple-choice',
    options: ['0.5', '1', '0', '√3/2'],
    correctAnswer: '0.5',
    explanation: 'sin(30°) = 1/2 = 0.5',
    difficulty: 'easy'
  },
  {
    id: 'q3',
    conceptId: 'c3',
    text: 'What is the derivative of f(x) = x²?',
    type: 'short-answer',
    correctAnswer: '2x',
    explanation: 'The power rule states that the derivative of x^n is n*x^(n-1). So for x², the derivative is 2*x^1 = 2x.',
    difficulty: 'medium'
  },
  {
    id: 'q4',
    conceptId: 'c4',
    text: 'Which of Newton\'s laws states that an object at rest stays at rest, and an object in motion stays in motion unless acted upon by an external force?',
    type: 'multiple-choice',
    options: ['First Law', 'Second Law', 'Third Law', 'None of the above'],
    correctAnswer: 'First Law',
    explanation: 'Newton\'s First Law is also known as the law of inertia, which states that an object will remain at rest or in uniform motion unless acted upon by an external force.',
    difficulty: 'easy'
  },
  {
    id: 'q5',
    conceptId: 'c5',
    text: 'A ball with a mass of 0.5 kg is dropped from a height of 10 meters. Ignoring air resistance, what is its kinetic energy just before it hits the ground? (g = 10 m/s²)',
    type: 'short-answer',
    correctAnswer: '50 J',
    explanation: 'Using conservation of energy, the potential energy at the top (mgh) equals the kinetic energy at the bottom (1/2 mv²). So, 0.5 * 10 * 10 = 50 Joules.',
    difficulty: 'medium'
  }
];

export const mockBadges: Badge[] = [
  {
    id: 'b1',
    name: 'Graph Builder',
    description: 'Complete 10 connected concepts',
    icon: 'award',
    earned: false,
    progress: {
      current: 4,
      required: 10
    }
  },
  {
    id: 'b2',
    name: 'Master of Math',
    description: 'Master all Math concepts',
    icon: 'brain',
    earned: false,
    progress: {
      current: 2,
      required: 4
    }
  },
  {
    id: 'b3',
    name: 'Weekly Warrior',
    description: 'Complete all weekly missions',
    icon: 'zap',
    earned: true
  },
  {
    id: 'b4',
    name: 'Question Crusher',
    description: 'Correctly answer 50 questions',
    icon: 'check-circle',
    earned: false,
    progress: {
      current: 23,
      required: 50
    }
  }
];

export const mockLearningPaths: LearningPath[] = [
  {
    id: 'lp1',
    title: 'Mastering Geometry',
    description: 'Learn the fundamentals of geometry from basic concepts to advanced theorems',
    concepts: ['c1', 'c2', 'c7'],
    progress: 67
  },
  {
    id: 'lp2',
    title: 'Physics Foundations',
    description: 'Build a strong foundation in physics with these core concepts',
    concepts: ['c4', 'c5', 'c6'],
    progress: 33
  }
];

export const mockUser: User = {
  id: 'u1',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  progress: {
    points: 2750,
    conceptsMastered: 2,
    streakDays: 5,
    badges: mockBadges
  },
  learningPaths: mockLearningPaths
};