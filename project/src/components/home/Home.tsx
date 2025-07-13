import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Brain, Zap, Award, MapPin, ChevronRight } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Visualize Your Learning Journey
              </h1>
              <p className="mt-6 text-xl text-blue-100 max-w-xl">
                ConceptMap AI helps you track your learning progress with interactive knowledge graphs, personalized learning paths, and adaptive practice.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link
                  to="/signup"
                  className="px-8 py-4 bg-white text-blue-700 rounded-lg shadow-lg font-medium text-lg hover:bg-gray-100 transition-colors"
                >
                  Get Started Free
                </Link>
                <Link
                  to="/login"
                  className="px-8 py-4 border-2 border-white text-white rounded-lg font-medium text-lg hover:bg-white hover:bg-opacity-10 transition-colors"
                >
                  Sign In
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="w-full max-w-lg h-80 bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm rounded-lg border border-white border-opacity-20 shadow-xl">
                {/* Placeholder for an interactive graph demo visualization */}
                <div className="h-full flex items-center justify-center">
                  <svg className="w-full h-full p-8 text-white opacity-30" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="100" cy="150" r="30" fill="currentColor" />
                    <circle cx="220" cy="80" r="25" fill="currentColor" />
                    <circle cx="300" cy="180" r="35" fill="currentColor" />
                    <circle cx="180" cy="220" r="20" fill="currentColor" />
                    <line x1="100" y1="150" x2="220" y2="80" stroke="currentColor" strokeWidth="2" />
                    <line x1="220" y1="80" x2="300" y2="180" stroke="currentColor" strokeWidth="2" />
                    <line x1="300" y1="180" x2="180" y2="220" stroke="currentColor" strokeWidth="2" />
                    <line x1="180" y1="220" x2="100" y2="150" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Powerful Learning Features</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Boost your learning efficiency with our innovative tools designed to help you understand, practice, and master concepts.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-4">
                <Brain size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Knowledge Graph</h3>
              <p className="text-gray-600">
                Visualize connections between concepts with our interactive knowledge graph. See how ideas connect and build upon each other.
              </p>
            </div>
          </div>
          
          {/* Feature 2 */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mb-4">
                <BookOpen size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Adaptive Practice</h3>
              <p className="text-gray-600">
                Get personalized practice questions that adapt to your skill level. Reinforce concepts with immediate feedback.
              </p>
            </div>
          </div>
          
          {/* Feature 3 */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-4">
                <MapPin size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Learning Paths</h3>
              <p className="text-gray-600">
                Follow guided learning paths that optimize your study sequence based on concept relationships and your progress.
              </p>
            </div>
          </div>
          
          {/* Feature 4 */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 mb-4">
                <Award size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Gamification</h3>
              <p className="text-gray-600">
                Stay motivated with points, badges, and streaks as you make progress. Turn learning into an engaging experience.
              </p>
            </div>
          </div>
          
          {/* Feature 5 */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600 mb-4">
                <Zap size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">AI Doubt Resolver</h3>
              <p className="text-gray-600">
                Ask questions and get intelligent explanations that connect to your knowledge graph and highlight relevant concepts.
              </p>
            </div>
          </div>
          
          {/* Feature 6 */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Ready to Get Started?</h3>
              <p className="mb-4">
                Create your account today and begin mapping your learning journey with ConceptMap AI.
              </p>
              <Link 
                to="/signup" 
                className="inline-flex items-center text-sm font-medium text-white border-b border-white pb-1 hover:border-opacity-80 transition-all"
              >
                Sign up now <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Testimonial Section */}
      <div className="bg-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">What Our Users Say</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-4">
                  <span className="text-lg font-bold">S</span>
                </div>
                <div>
                  <h4 className="font-medium">Sarah T.</h4>
                  <p className="text-sm text-gray-500">Computer Science Student</p>
                </div>
              </div>
              <p className="text-gray-600">
                "ConceptMap AI helped me visualize connections between different programming concepts. The knowledge graph made it so much easier to understand how everything fits together."
              </p>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-4">
                  <span className="text-lg font-bold">M</span>
                </div>
                <div>
                  <h4 className="font-medium">Michael J.</h4>
                  <p className="text-sm text-gray-500">High School Teacher</p>
                </div>
              </div>
              <p className="text-gray-600">
                "I use ConceptMap AI with my students to help them understand how mathematical concepts build on each other. The visual approach has been revolutionary for their learning."
              </p>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-4">
                  <span className="text-lg font-bold">A</span>
                </div>
                <div>
                  <h4 className="font-medium">Aisha R.</h4>
                  <p className="text-sm text-gray-500">Med School Student</p>
                </div>
              </div>
              <p className="text-gray-600">
                "The adaptive practice feature is a game-changer. It helps me focus on my weak areas while reinforcing what I already know. My study time is now so much more efficient."
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-left mb-8 md:mb-0">
            <h2 className="text-3xl font-bold">Ready to Transform Your Learning?</h2>
            <p className="mt-2 text-blue-100 max-w-xl">
              Join thousands of students who are mapping their knowledge and optimizing their learning journey.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/signup"
              className="px-8 py-3 bg-white text-blue-700 rounded-lg shadow font-medium text-lg hover:bg-gray-100 transition-colors"
            >
              Get Started Free
            </Link>
            <Link
              to="/dashboard"
              className="px-8 py-3 border-2 border-white text-white rounded-lg font-medium text-lg hover:bg-white hover:bg-opacity-10 transition-colors"
            >
              Try Demo
            </Link>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white text-lg font-bold mb-4">ConceptMap AI</h3>
              <p className="mb-4">Visualize your learning journey with our interactive knowledge graphs and adaptive learning system.</p>
            </div>
            <div>
              <h4 className="text-white text-sm font-bold uppercase mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white text-sm font-bold uppercase mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white text-sm font-bold uppercase mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p>&copy; 2025 ConceptMap AI. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">GitHub</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;