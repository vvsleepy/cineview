import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovies } from '../services/api';
import MovieCard from '../components/MovieCard';
import LoadingSpinner from '../components/LoadingSpinner';

function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;
      
      try {
        setLoading(true);
        setError(null);
        const data = await searchMovies(query);
        setResults(data);
      } catch (err) {
        console.error(err);
        setError('Failed to search movies. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Search Results</h1>
          <p className="text-gray-300">
            {query ? `Showing results for "${query}"` : 'Enter a search term to find movies'}
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
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
        )}
        
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            {results.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {results.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            ) : (
              query && !loading && (
                <div className="text-center py-16">
                  <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">No results found</h3>
                  <p className="text-gray-500">Try a different search term or browse our movie collection.</p>
                </div>
              )
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default SearchPage;