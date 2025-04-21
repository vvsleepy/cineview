import { createContext, useContext, useState, useEffect } from 'react';
import { fetchPopularMovies, fetchMoviesByGenre, fetchGenres } from '../services/api';

const MovieContext = createContext();

export function useMovies() {
  return useContext(MovieContext);
}

export function MovieProvider({ children }) {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(null);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);
        const genresData = await fetchGenres();
        setGenres(genresData);
        
        const moviesData = await fetchPopularMovies();
        setMovies(moviesData);
      } catch (err) {
        setError('Failed to fetch data. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const filterByGenre = async (genreId) => {
    try {
      setLoading(true);
      setSelectedGenre(genreId);
      
      if (genreId) {
        const genreMovies = await fetchMoviesByGenre(genreId);
        setMovies(genreMovies);
      } else {
        const popularMovies = await fetchPopularMovies();
        setMovies(popularMovies);
      }
    } catch (err) {
      setError('Failed to fetch movies by genre. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addToFavorites = (movie) => {
    if (!favorites.some(fav => fav.id === movie.id)) {
      setFavorites([...favorites, movie]);
    }
  };

  const removeFromFavorites = (movieId) => {
    setFavorites(favorites.filter(movie => movie.id !== movieId));
  };

  const isFavorite = (movieId) => {
    return favorites.some(movie => movie.id === movieId);
  };

  const value = {
    movies,
    genres,
    favorites,
    loading,
    error,
    selectedGenre,
    filterByGenre,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  };

  return (
    <MovieContext.Provider value={value}>
      {children}
    </MovieContext.Provider>
  );
}