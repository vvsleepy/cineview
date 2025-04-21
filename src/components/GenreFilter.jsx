import { useMovies } from '../context/MovieContext';

function GenreFilter() {
  const { genres, selectedGenre, filterByGenre } = useMovies();

  return (
    <div className="mb-8 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Choose Your Genre ✨</h2>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => filterByGenre(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 shadow-sm hover:shadow ${
            selectedGenre === null
              ? 'bg-primary-400 dark:bg-primary-600 text-white shadow-primary-200/50 dark:shadow-primary-900/50'
              : 'bg-pastel-purple dark:bg-gray-700 hover:bg-pastel-purple/80 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200'
          }`}
        >
          All Movies
        </button>
        
        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => filterByGenre(genre.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 shadow-sm hover:shadow ${
              selectedGenre === genre.id
                ? 'bg-primary-400 dark:bg-primary-600 text-white shadow-primary-200/50 dark:shadow-primary-900/50'
                : 'bg-pastel-purple dark:bg-gray-700 hover:bg-pastel-purple/80 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200'
            }`}
          >
            {genre.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default GenreFilter;