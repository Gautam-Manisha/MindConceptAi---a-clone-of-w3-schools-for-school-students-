import React, { useState } from 'react';
import { Menu, X, User, LogOut, Home, Brain, BookOpen, Award, Settings } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: <Home size={20} /> },
    { name: 'Practice', path: '/practice', icon: <Brain size={20} /> },
    { name: 'Progress', path: '/progress', icon: <BookOpen size={20} /> },
    { name: 'Badges', path: '/badges', icon: <Award size={20} /> },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white shadow-sm fixed w-full z-10">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <Brain className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">ConceptMap AI</span>
          </Link>
        </div>
        
        {/* Desktop navigation */}
        <div className="hidden md:flex md:items-center md:space-x-4">
          {user && navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors duration-200 ease-in-out ${
                isActive(link.path)
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span className="mr-2">{link.icon}</span>
              {link.name}
            </Link>
          ))}
        </div>
        
        {/* User menu or login/signup */}
        <div className="hidden md:flex md:items-center">
          {user ? (
            <div className="flex items-center space-x-3">
              <div className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 flex items-center">
                <Award size={14} className="mr-1" />
                <span className="text-sm font-medium">{user.progress.points} XP</span>
              </div>
              <div className="relative group">
                <button className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 focus:outline-none">
                  <span className="text-sm font-medium">{user.name}</span>
                  <User size={20} />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                  <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Your Profile
                  </Link>
                  <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Settings
                  </Link>
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <div className="flex items-center">
                      <LogOut size={16} className="mr-2" />
                      Sign out
                    </div>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600"
              >
                Sign in
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
        
        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none"
          >
            <span className="sr-only">Open main menu</span>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {user && navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-3 py-2 rounded-md text-base font-medium flex items-center ${
                  isActive(link.path)
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                onClick={toggleMenu}
              >
                <span className="mr-2">{link.icon}</span>
                {link.name}
              </Link>
            ))}
            
            {user ? (
              <>
                <div className="px-3 py-2 flex items-center justify-between">
                  <div className="flex items-center">
                    <User size={18} className="mr-2 text-gray-600" />
                    <span className="text-sm font-medium">{user.name}</span>
                  </div>
                  <div className="px-2 py-1 rounded-full bg-blue-100 text-blue-800 flex items-center">
                    <Award size={14} className="mr-1" />
                    <span className="text-xs font-medium">{user.progress.points} XP</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    logout();
                    toggleMenu();
                  }}
                  className="w-full block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-100 flex items-center"
                >
                  <LogOut size={18} className="mr-2" />
                  Sign out
                </button>
              </>
            ) : (
              <div className="flex flex-col space-y-2 px-3 py-2">
                <Link
                  to="/login"
                  className="w-full block px-3 py-2 text-center rounded-md text-gray-700 border border-gray-300 hover:bg-gray-100"
                  onClick={toggleMenu}
                >
                  Sign in
                </Link>
                <Link
                  to="/signup"
                  className="w-full block px-3 py-2 text-center rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  onClick={toggleMenu}
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;