import axios from 'axios';

const API_KEY = '45f60dae6b5f7d1665bcbb7a36dcb57e';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

// Create axios instance with authorization headers
const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper to get image URLs
export const getImageUrl = (path, size = 'w500') => {
  if (!path) return null;
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

// Fetch popular movies
export const fetchPopularMovies = async (page = 1) => {
  try {
    const response = await api.get('/movie/popular', {
      params: { page },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    throw error;
  }
};

// Fetch movie details
export const fetchMovieDetails = async (movieId) => {
  try {
    const response = await api.get(`/movie/${movieId}`, {
      params: {
        append_to_response: 'videos,credits',
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching movie details for ID ${movieId}:`, error);
    throw error;
  }
};

// Fetch movies by genre
export const fetchMoviesByGenre = async (genreId, page = 1) => {
  try {
    const response = await api.get('/discover/movie', {
      params: {
        with_genres: genreId,
        page,
        sort_by: 'popularity.desc',
      },
    });
    return response.data.results;
  } catch (error) {
    console.error(`Error fetching movies for genre ID ${genreId}:`, error);
    throw error;
  }
};

// Fetch all available genres
export const fetchGenres = async () => {
  try {
    const response = await api.get('/genre/movie/list');
    return response.data.genres;
  } catch (error) {
    console.error('Error fetching genres:', error);
    throw error;
  }
};

// Search movies
export const searchMovies = async (query, page = 1) => {
  try {
    const response = await api.get('/search/movie', {
      params: {
        query,
        page,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error(`Error searching for "${query}":`, error);
    throw error;
  }
};