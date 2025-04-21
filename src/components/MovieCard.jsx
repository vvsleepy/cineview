import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMovies } from '../context/MovieContext';
import { getImageUrl } from '../services/api';

function MovieCard({ movie }) {
  const { addToFavorites, removeFromFavorites, isFavorite } = useMovies();
  const [isHovered, setIsHovered] = useState(false);
  const favorite = isFavorite(movie.id);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (favorite) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  return (
    <div 
      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/movie/${movie.id}`} className="relative block">
        <div className="aspect-[2/3] overflow-hidden relative rounded-t-2xl">
          {movie.poster_path ? (
            <img 
              src={getImageUrl(movie.poster_path)}
              alt={movie.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-pastel-blue dark:bg-gray-700">
              <span className="text-gray-600 dark:text-gray-300">No image available</span>
            </div>
          )}
          
          <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>
          
          <button 
            onClick={handleFavoriteClick}
            className="absolute top-3 right-3 p-2.5 rounded-full bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-700 transition-colors duration-200 z-10 shadow-lg"
            aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
          >
            <svg 
              viewBox="0 0 24 24" 
              fill={favorite ? "currentColor" : "none"} 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className={`w-5 h-5 ${favorite ? 'text-primary-500' : 'text-gray-600 dark:text-gray-300'}`}
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-lg truncate mb-1 text-gray-800 dark:text-white">{movie.title}</h3>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {movie.release_date ? new Date(movie.release_date).getFullYear() : 'Unknown'}
            </span>
            <div className="flex items-center bg-pastel-yellow dark:bg-yellow-600/30 px-2.5 py-1 rounded-full text-xs font-medium text-gray-700 dark:text-yellow-200">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{movie.overview || 'No description available.'}</p>
        </div>
      </Link>
    </div>
  );
}

export default MovieCard;