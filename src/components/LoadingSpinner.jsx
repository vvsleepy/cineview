function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center py-12">
      <div className="relative">
        <div className="w-16 h-16 rounded-full border-4 border-primary-200 animate-spin border-t-primary-500"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-4 border-accent-200 animate-spin border-t-accent-500 animate-[spin_0.8s_linear_infinite]"></div>
        </div>
      </div>
    </div>
  );
}

export default LoadingSpinner;