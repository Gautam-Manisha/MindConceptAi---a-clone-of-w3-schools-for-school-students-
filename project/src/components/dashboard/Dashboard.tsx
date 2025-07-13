import React, { useState } from 'react';
import { useGraph } from '../../context/GraphContext';
import { useAuth } from '../../context/AuthContext';
import KnowledgeGraph from './KnowledgeGraph';
import ConceptDetails from './ConceptDetails';
import { Filter, Search, Map, Brain, BookOpen, Zap } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { selectedConcept, selectConcept, filterBySubject, activeSubject } = useGraph();
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const subjects = ['Mathematics', 'Physics', 'Chemistry'];

  const handleCloseDetails = () => {
    selectConcept(null);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] pt-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Your Knowledge Map</h1>
          <p className="mt-2 text-gray-600">
            Explore your learning journey with our interactive knowledge graph
          </p>
        </div>

        {/* Stats and quick actions */}
        {user && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                <Map className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Concepts</p>
                <p className="text-xl font-semibold">{10}</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                <Brain className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Mastered</p>
                <p className="text-xl font-semibold">{user.progress.conceptsMastered}</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center">
              <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center mr-3">
                <BookOpen className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Learning Paths</p>
                <p className="text-xl font-semibold">{user.learningPaths.length}</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                <Zap className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Streak</p>
                <p className="text-xl font-semibold">{user.progress.streakDays} days</p>
              </div>
            </div>
          </div>
        )}

        {/* Search and filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 mb-6">
          <div className="relative w-full md:w-1/3">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search concepts..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center space-x-2 w-full md:w-auto">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </button>
            
            {activeSubject && (
              <button
                onClick={() => filterBySubject(null)}
                className="inline-flex items-center px-3 py-2 bg-blue-100 text-blue-800 rounded-md text-sm"
              >
                {activeSubject} <span className="ml-2">×</span>
              </button>
            )}
          </div>
        </div>
        
        {showFilters && (
          <div className="bg-white p-4 rounded-lg shadow-md mb-6 border border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Filter by Subject</h3>
            <div className="flex flex-wrap gap-2">
              {subjects.map((subject) => (
                <button
                  key={subject}
                  onClick={() => {
                    filterBySubject(subject);
                    setShowFilters(false);
                  }}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                    activeSubject === subject
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {subject}
                </button>
              ))}
              {activeSubject && (
                <button
                  onClick={() => filterBySubject(null)}
                  className="px-3 py-1.5 rounded-md text-sm font-medium bg-red-100 text-red-800 hover:bg-red-200"
                >
                  Clear Filter
                </button>
              )}
            </div>
          </div>
        )}
        
        {/* Main content area with graph and details panel */}
        <div className="flex flex-col md:flex-row gap-6 h-[calc(100vh-16rem)] min-h-[600px]">
          <div className={`flex-grow h-full ${selectedConcept ? 'md:w-2/3' : 'w-full'}`}>
            <KnowledgeGraph />
          </div>
          
          {selectedConcept && (
            <div className="h-full md:w-1/3 overflow-hidden">
              <ConceptDetails onClose={handleCloseDetails} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;