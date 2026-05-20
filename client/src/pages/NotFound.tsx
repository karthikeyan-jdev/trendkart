import { Home, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
      <div className="bg-white shadow-xl rounded-3xl p-10 max-w-lg w-full text-center">
        {/* 404 */}
        <h1 className="text-8xl font-extrabold text-blue-600">404</h1>

        <h2 className="text-3xl font-bold mt-4">Page Not Found</h2>

        <p className="text-gray-500 mt-4 leading-7">
          Oops! The page you are looking for doesn’t exist or may have been
          moved.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <button
            onClick={() => navigate("/")}
            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-xl font-medium"
          >
            <Home size={20} />
            Back Home
          </button>

          <button
            onClick={() => navigate("/")}
            className="flex-1 flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-100 transition py-3 rounded-xl font-medium"
          >
            <ShoppingBag size={20} />
            Shop Now
          </button>
        </div>

        {/* Decorative */}
        <div className="mt-10 text-gray-400 text-sm">
          TrendKart • Modern Ecommerce Experience
        </div>
      </div>
    </div>
  );
};

export default NotFound;