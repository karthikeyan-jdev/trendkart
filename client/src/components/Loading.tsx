const Loading = () => {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6
      min-h-screen bg-gray-100 p-6"
    >
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-md p-4 animate-pulse"
        >
          <div className="h-52 w-full bg-gray-300 rounded-md"></div>
          <div className="h-5 bg-gray-300 rounded mt-4"></div>
          <div className="h-5 w-20 bg-gray-300 rounded mt-3"></div>
        </div>
      ))}
    </div>
  );
};

export default Loading;
