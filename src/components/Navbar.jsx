import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import DarkModeSwitch from './DarkModeSwitch';

function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
      setIsMenuOpen(false);
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg sticky top-0 z-30 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                <span className="ml-2 text-xl font-bold bg-gradient-to-r from-primary-500 to-accent-500 text-transparent bg-clip-text">
                  CineView ✨
                </span>
              </Link>
            </div>
            
            <nav className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive('/') 
                    ? 'border-primary-400 text-primary-600 dark:text-primary-400' 
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:border-gray-300 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                Home
              </Link>
              <Link
                to="/favorites"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive('/favorites') 
                    ? 'border-primary-400 text-primary-600 dark:text-primary-400' 
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:border-gray-300 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                Favorites
              </Link>
            </nav>
          </div>
          
          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
            <DarkModeSwitch />
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search movies..."
                className="w-56 py-2 pl-10 pr-3 text-sm rounded-full border border-pastel-purple dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400 bg-white/60 dark:bg-gray-700/60 dark:text-white transition-colors duration-300"
              />
              <svg 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </form>
          </div>
          
          <div className="flex items-center sm:hidden">
            <DarkModeSwitch />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="ml-2 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <div className={`${isMenuOpen ? 'block' : 'hidden'} sm:hidden bg-white/95 dark:bg-gray-800/95`}>
        <div className="pt-2 pb-3 space-y-1">
          <Link
            to="/"
            className={`block pl-3 pr-4 py-2 text-base font-medium ${
              isActive('/') 
                ? 'bg-primary-50 dark:bg-primary-900/50 border-l-4 border-primary-400 text-primary-600 dark:text-primary-400' 
                : 'border-l-4 border-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 hover:text-gray-800 dark:hover:text-white'
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/favorites"
            className={`block pl-3 pr-4 py-2 text-base font-medium ${
              isActive('/favorites') 
                ? 'bg-primary-50 dark:bg-primary-900/50 border-l-4 border-primary-400 text-primary-600 dark:text-primary-400' 
                : 'border-l-4 border-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 hover:text-gray-800 dark:hover:text-white'
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Favorites
          </Link>
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
          <form onSubmit={handleSearch} className="px-4">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search movies..."
                className="block w-full py-2 pl-10 pr-3 text-base rounded-full border border-pastel-purple dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400 bg-white/60 dark:bg-gray-700/60 dark:text-white transition-colors duration-300"
              />
              <svg 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </form>
        </div>
      </div>
    </header>
  );
}

export default Navbar;