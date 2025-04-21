import { useMovies } from '../context/MovieContext';
import MovieCard from '../components/MovieCard';

function FavoritesPage() {
  const { favorites } = useMovies();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-accent-800 to-accent-600 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Your Favorites</h1>
          <p className="text-accent-100">Keep track of the movies you love.</p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {favorites.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <svg 
              className="w-16 h-16 text-gray-300 mx-auto mb-4" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
              />
            </svg>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No favorites yet</h3>
            <p className="text-gray-500 mb-6">Movies you add to your favorites will appear here.</p>
            <a href="/" className="btn bg-primary-600 hover:bg-primary-700">Browse Movies</a>
          </div>
        )}
      </div>
    </div>
  );
}

export default FavoritesPage;