import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails, getImageUrl } from '../services/api';
import { useMovies } from '../context/MovieContext';
import LoadingSpinner from '../components/LoadingSpinner';

function MovieDetailPage() {
  const { id } = useParams();
  const { addToFavorites, removeFromFavorites, isFavorite } = useMovies();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        setLoading(true);
        const data = await fetchMovieDetails(id);
        setMovie(data);
      } catch (err) {
        setError('Failed to fetch movie details. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    getMovieDetails();
  }, [id]);

  const handleFavoriteClick = () => {
    if (!movie) return;
    
    if (isFavorite(movie.id)) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  const formatRuntime = (minutes) => {
    if (!minutes) return 'Unknown';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  if (loading) return <LoadingSpinner />;
  
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!movie) return null;

  const favorite = isFavorite(movie.id);

  return (
    <div className="bg-gradient-to-b from-pastel-pink via-pastel-purple to-pastel-blue min-h-screen">
      <div 
        className="relative w-full h-[30vh] md:h-[50vh] bg-gray-900"
        style={{
          backgroundImage: movie.backdrop_path 
            ? `url(${getImageUrl(movie.backdrop_path, 'original')})` 
            : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
        <div className="container mx-auto px-4 py-8 relative z-10 h-full flex items-end">
          <div className="flex flex-col md:flex-row -mb-24 md:-mb-20">
            <div className="w-48 md:w-64 flex-shrink-0 z-10 md:mr-8 transform transition-transform duration-300 hover:scale-105 shadow-xl rounded-lg overflow-hidden">
              {movie.poster_path ? (
                <img 
                  src={getImageUrl(movie.poster_path, 'w500')} 
                  alt={movie.title}
                  className="w-full h-auto"
                />
              ) : (
                <div className="w-full aspect-[2/3] bg-pastel-blue flex items-center justify-center">
                  <span className="text-gray-600">No poster available</span>
                </div>
              )}
            </div>
            
            <div className="flex-1 mt-6 md:mt-0 text-white">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{movie.title}</h1>
              
              {movie.release_date && (
                <p className="text-gray-300 mb-4">
                  {new Date(movie.release_date).getFullYear()}
                  {movie.runtime && ` • ${formatRuntime(movie.runtime)}`}
                  {movie.vote_average > 0 && (
                    <span className="ml-3 inline-flex items-center bg-pastel-yellow px-2.5 py-0.5 rounded-full text-xs font-medium text-gray-700">
                      <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      {movie.vote_average.toFixed(1)}
                    </span>
                  )}
                </p>
              )}
              
              {movie.genres && movie.genres.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {movie.genres.map((genre) => (
                    <span 
                      key={genre.id}
                      className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium text-white"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              )}
              
              <button
                onClick={handleFavoriteClick}
                className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  favorite 
                    ? 'bg-primary-500 hover:bg-primary-600 text-white' 
                    : 'bg-white text-gray-900 hover:bg-gray-100'
                }`}
              >
                <svg 
                  className={`mr-2 h-5 w-5 ${favorite ? 'text-white' : 'text-primary-500'}`} 
                  fill={favorite ? "currentColor" : "none"} 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {favorite ? 'Remove from Favorites' : 'Add to Favorites'}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 pt-28 md:pt-28 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Overview</h2>
              <p className="text-gray-700 leading-relaxed">
                {movie.overview || 'No overview available.'}
              </p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-4">Movie Info</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-gray-500 text-sm">Status</span>
                  <span className="block text-gray-900 font-medium">{movie.status || 'Unknown'}</span>
                </div>
                <div>
                  <span className="text-gray-500 text-sm">Original Language</span>
                  <span className="block text-gray-900 font-medium">
                    {movie.original_language ? movie.original_language.toUpperCase() : 'Unknown'}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 text-sm">Budget</span>
                  <span className="block text-gray-900 font-medium">
                    {movie.budget > 0 
                      ? `$${movie.budget.toLocaleString()}` 
                      : 'Not available'}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 text-sm">Revenue</span>
                  <span className="block text-gray-900 font-medium">
                    {movie.revenue > 0 
                      ? `$${movie.revenue.toLocaleString()}` 
                      : 'Not available'}
                  </span>
                </div>
              </div>
            </div>
            
            {movie.credits && movie.credits.cast && movie.credits.cast.length > 0 && (
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold mb-4">Top Cast</h3>
                <div className="space-y-4">
                  {movie.credits.cast.slice(0, 5).map((person) => (
                    <div key={person.id} className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full overflow-hidden bg-pastel-blue">
                        {person.profile_path ? (
                          <img 
                            src={getImageUrl(person.profile_path, 'w92')} 
                            alt={person.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center text-gray-400">
                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{person.name}</p>
                        <p className="text-xs text-gray-500">{person.character}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetailPage;