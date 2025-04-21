import { useState, useEffect } from 'react';
import { useMovies } from '../context/MovieContext';
import MovieCard from '../components/MovieCard';
import GenreFilter from '../components/GenreFilter';
import LoadingSpinner from '../components/LoadingSpinner';

function HomePage() {
  const { movies, loading, error } = useMovies();
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHeaderVisible(false);
      } else {
        setIsHeaderVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 dark:bg-red-900/50 border-l-4 border-red-500 p-4 mb-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700 dark:text-red-200">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pastel-pink via-pastel-purple to-pastel-blue dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <div className={`bg-gradient-to-r from-primary-400/80 to-accent-400/80 dark:from-primary-900/80 dark:to-accent-900/80 backdrop-blur-sm text-white transition-all duration-500 ${isHeaderVisible ? 'py-16' : 'py-8'}`}>
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4 animate-fade-in">
            Discover Magical Movies
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mb-6 animate-slide-up">
            Explore a wonderful collection of films, find your next favorite, 
            and create your perfect movie list. ✨
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <GenreFilter />
        
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            {movies.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {movies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg shadow-lg">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">No movies found</h3>
                <p className="text-gray-600 dark:text-gray-300">Try selecting a different genre or check back later. 🎬</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default HomePage;