import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useGraph } from '../../context/GraphContext';
import { Award, Star, Zap, Trophy, Clock, BookOpen, CheckCircle } from 'lucide-react';

const ProgressTracker: React.FC = () => {
  const { user } = useAuth();
  const { concepts } = useGraph();

  if (!user) return null;

  // Calculate concept stats
  const masteredCount = concepts.filter(c => c.mastery === 'mastered').length;
  const reviewCount = concepts.filter(c => c.mastery === 'review').length;
  const weakCount = concepts.filter(c => c.mastery === 'weak').length;
  const totalConcepts = concepts.length;

  // Calculate mastery percentage
  const masteryPercentage = Math.round((masteredCount / totalConcepts) * 100);

  // Dummy data for weekly progress (in a real app, this would come from a database)
  const weeklyProgress = [
    { day: 'Mon', concepts: 2, points: 120 },
    { day: 'Tue', concepts: 3, points: 180 },
    { day: 'Wed', concepts: 1, points: 60 },
    { day: 'Thu', concepts: 4, points: 240 },
    { day: 'Fri', concepts: 2, points: 150 },
    { day: 'Sat', concepts: 0, points: 0 },
    { day: 'Sun', concepts: 0, points: 0 },
  ];

  // Calculate max points for chart scale
  const maxPoints = Math.max(...weeklyProgress.map(day => day.points));

  return (
    <div className="min-h-[calc(100vh-4rem)] pt-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Your Progress</h1>
          <p className="mt-2 text-gray-600">
            Track your learning journey and see your achievements
          </p>
        </div>

        {/* Overview cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-start">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                <Trophy className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Points</p>
                <p className="text-2xl font-bold">{user.progress.points}</p>
                <div className="mt-1 text-xs text-green-600 flex items-center">
                  <span className="font-medium">+230 this week</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-start">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Concepts Mastered</p>
                <p className="text-2xl font-bold">{masteredCount} <span className="text-sm text-gray-500">/ {totalConcepts}</span></p>
                <div className="mt-1 text-xs text-gray-600 flex items-center">
                  <div className="w-full h-1.5 bg-gray-200 rounded-full mt-1">
                    <div
                      className="h-full bg-green-500 rounded-full"
                      style={{ width: `${(masteredCount / totalConcepts) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-start">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                <Award className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Badges Earned</p>
                <p className="text-2xl font-bold">{user.progress.badges.filter(b => b.earned).length} <span className="text-sm text-gray-500">/ {user.progress.badges.length}</span></p>
                <div className="mt-1 text-xs text-gray-600 flex items-center">
                  <Star className="h-3 w-3 text-yellow-500 mr-1" />
                  <span>Latest: Weekly Warrior</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-start">
              <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center mr-4">
                <Zap className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Current Streak</p>
                <p className="text-2xl font-bold">{user.progress.streakDays} days</p>
                <div className="mt-1 text-xs text-blue-600 flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>Last activity: Today</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Activity and Concept Mastery */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Concept Mastery */}
          <div className="bg-white rounded-lg shadow-sm p-6 lg:col-span-1">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Concept Mastery</h2>
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200">
                    Mastery Progress
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-green-600">
                    {masteryPercentage}%
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                <div
                  style={{ width: `${masteryPercentage}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
                ></div>
              </div>
            </div>
            
            <div className="space-y-4 mt-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
                  <span>Mastered</span>
                </div>
                <span className="font-medium">{masteredCount}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-yellow-500 mr-2"></div>
                  <span>Needs Review</span>
                </div>
                <span className="font-medium">{reviewCount}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-red-500 mr-2"></div>
                  <span>Weak</span>
                </div>
                <span className="font-medium">{weakCount}</span>
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="text-sm font-medium text-gray-700 mb-3">By Subject</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">Mathematics</span>
                    <span className="text-sm font-medium">75%</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-200 rounded-full">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">Physics</span>
                    <span className="text-sm font-medium">40%</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-200 rounded-full">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '40%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">Chemistry</span>
                    <span className="text-sm font-medium">25%</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-200 rounded-full">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '25%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Weekly Activity */}
          <div className="bg-white rounded-lg shadow-sm p-6 lg:col-span-2">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Weekly Activity</h2>
            <div className="h-64 flex items-end space-x-2">
              {weeklyProgress.map((day, i) => (
                <div key={i} className="flex-1 flex flex-col items-center">
                  <div className="flex-1 w-full flex items-end justify-center">
                    <div
                      className="w-full bg-blue-500 rounded-t-md"
                      style={{
                        height: `${(day.points / maxPoints) * 100}%`,
                        minHeight: day.points > 0 ? '10%' : '0'
                      }}
                    ></div>
                  </div>
                  <div className="mt-2 text-xs font-medium text-gray-500">{day.day}</div>
                  <div className="text-xs text-gray-600">{day.points}</div>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center mt-6 pt-6 border-t">
              <div>
                <h3 className="text-sm font-medium text-gray-700">This Week's Activity</h3>
                <div className="mt-1 flex items-baseline">
                  <p className="text-2xl font-semibold text-gray-900">750</p>
                  <p className="ml-2 text-sm font-medium text-green-600">
                    +12.3% from last week
                  </p>
                </div>
              </div>
              <div className="flex space-x-4">
                <div className="flex flex-col items-center">
                  <BookOpen className="h-5 w-5 text-gray-400 mb-1" />
                  <span className="text-sm text-gray-600 font-medium">12</span>
                  <span className="text-xs text-gray-500">Concepts</span>
                </div>
                <div className="flex flex-col items-center">
                  <CheckCircle className="h-5 w-5 text-gray-400 mb-1" />
                  <span className="text-sm text-gray-600 font-medium">38</span>
                  <span className="text-xs text-gray-500">Questions</span>
                </div>
                <div className="flex flex-col items-center">
                  <Clock className="h-5 w-5 text-gray-400 mb-1" />
                  <span className="text-sm text-gray-600 font-medium">6h 20m</span>
                  <span className="text-xs text-gray-500">Time</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Badges</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {user.progress.badges.map((badge) => (
              <div
                key={badge.id}
                className={`border rounded-lg p-4 flex flex-col items-center text-center ${
                  badge.earned ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50 opacity-60'
                }`}
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 ${
                  badge.earned ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-400'
                }`}>
                  {badge.icon === 'award' && <Award size={32} />}
                  {badge.icon === 'brain' && <BookOpen size={32} />}
                  {badge.icon === 'zap' && <Zap size={32} />}
                  {badge.icon === 'check-circle' && <CheckCircle size={32} />}
                </div>
                <h3 className="font-medium text-gray-900">{badge.name}</h3>
                <p className="text-xs text-gray-500 mt-1">{badge.description}</p>
                {badge.progress && !badge.earned && (
                  <div className="mt-2 w-full">
                    <div className="flex justify-between text-xs mb-1">
                      <span>{badge.progress.current}</span>
                      <span>{badge.progress.required}</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${(badge.progress.current / badge.progress.required) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}
                {badge.earned && (
                  <div className="mt-2 px-2 py-1 bg-green-100 rounded-full text-xs font-medium text-green-800">
                    Earned
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Learning Paths */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Learning Paths</h2>
          <div className="space-y-6">
            {user.learningPaths.map((path) => (
              <div key={path.id} className="border rounded-lg p-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{path.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{path.description}</p>
                  </div>
                  <div className="mt-2 md:mt-0">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      {path.progress}% Complete
                    </span>
                  </div>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full"
                    style={{ width: `${path.progress}%` }}
                  ></div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <BookOpen className="h-4 w-4 text-gray-500 mr-1" />
                  <span className="text-gray-600">{path.concepts.length} concepts</span>
                  <button className="ml-auto text-blue-600 hover:text-blue-800 font-medium">
                    Continue Learning
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;