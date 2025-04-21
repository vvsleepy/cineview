import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MovieProvider } from './context/MovieContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import MovieDetailPage from './pages/MovieDetailPage';
import FavoritesPage from './pages/FavoritesPage';
import SearchPage from './pages/SearchPage';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <MovieProvider>
          <div className="min-h-screen flex flex-col dark:bg-gray-900 transition-colors duration-300">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/movie/:id" element={<MovieDetailPage />} />
                <Route path="/favorites" element={<FavoritesPage />} />
                <Route path="/search" element={<SearchPage />} />
              </Routes>
            </main>
            <footer className="bg-gray-900 dark:bg-gray-950 text-white py-8">
              <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <div className="flex items-center mb-4 md:mb-0">
                    <span className="font-bold text-xl">CineView</span>
                  </div>
                  <div className="text-center md:text-right">
                    <p className="text-sm text-gray-400">
                      This product uses the TMDB API but is not endorsed or certified by TMDB.
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      © {new Date().getFullYear()} CineView. All rights reserved.
                    </p>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </MovieProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;