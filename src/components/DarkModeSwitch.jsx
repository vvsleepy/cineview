import { useTheme } from '../context/ThemeContext';

function DarkModeSwitch() {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <button
      onClick={toggleDarkMode}
      className="relative inline-flex items-center p-1.5 rounded-full bg-gradient-to-r from-primary-200 to-accent-200 dark:from-primary-900 dark:to-accent-900 transition-all duration-300 shadow-md hover:shadow-lg"
      aria-label="Toggle dark mode"
    >
      <div className="w-14 h-7 relative">
        {/* Sun Icon */}
        <div className={`absolute inset-y-0 left-0 flex items-center justify-center w-7 h-7 transition-opacity duration-300 ${darkMode ? 'opacity-0' : 'opacity-100'}`}>
          <div className="w-5 h-5 rounded-full bg-yellow-400 shadow-inner flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-yellow-300"></div>
          </div>
        </div>
        
        {/* Moon Icon */}
        <div className={`absolute inset-y-0 right-0 flex items-center justify-center w-7 h-7 transition-opacity duration-300 ${darkMode ? 'opacity-100' : 'opacity-0'}`}>
          <div className="w-5 h-5 rounded-full bg-slate-300 shadow-inner flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-slate-400"></div>
          </div>
        </div>
        
        {/* Sliding Circle */}
        <div
          className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-lg transform transition-transform duration-300 ${
            darkMode ? 'translate-x-8' : 'translate-x-1'
          }`}
        />
      </div>
    </button>
  );
}

export default DarkModeSwitch;